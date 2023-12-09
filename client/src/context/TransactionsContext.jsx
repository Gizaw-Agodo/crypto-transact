import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, transactionAbi } from "../utils/constants";

export const TransactionsContext = React.createContext();
const { ethereum } = window;

const getEtheriumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    transactionAbi,
    signer
  );
  return transactionContract;
};

// eslint-disable-next-line react/prop-types
export const TransactionProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactions, setTransactions] = useState([])
 
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) alert("please install metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      getAllTransactions()
    }
  };

  const getAllTransactions = async()=>{
    try {
      if (!ethereum) alert("please install metamask");
      const contract = getEtheriumContract();
      const allTransactions = await contract.getAllTransactions();
      const structuredTransactions = allTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }));

      setTransactions(structuredTransactions);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) alert("please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) alert("please install metamask");
      const {amount, addressTo, message, keyword} = formData;
      const parsedAmount = ethers.utils.parseEther(amount)
      const contract = getEtheriumContract();
      await ethereum.request({
        method:"eth_sendTransaction",
        params:[{
          from:currentAccount, 
          to:addressTo, 
          gax : "0x5208",
          value:parsedAmount._hex,
        }]
      })
      const hash = await contract.addToBlockchain(addressTo, parsedAmount, message, keyword)
      setIsLoading(true)
      await hash.wait()
      setIsLoading(false)
      const transactionCount = await contract.getTransactionCount()
      localStorage.setItem('transactionCount', transactionCount.toNumber())
      setTransactionCount(transactionCount.toNumber())
      window.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        handleChange,
        sendTransaction,
        isLoading,
        transactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
