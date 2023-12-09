
// eslint-disable-next-line react/prop-types
const TransactionCard = ({ addressTo, addressFrom, timestamp, message, amount }) => {
  return (
    <div className=" eth-card m-2 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[440px]
      sm:max-w-[600px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className=" text-base hover:text-green-900 hover:font-bold"><strong>From:</strong> {addressFrom}</p>
          </a>
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className=" text-base hover:text-green-900 hover:font-bold"><strong>To:</strong> {addressTo}</p>
          </a>
          <p className=" text-base"><strong>Amount:</strong> {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-base"><strong>Message:</strong> {message}</p>
            </>
          )}
        </div>
        <div className=" blue-glassmorphism p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard