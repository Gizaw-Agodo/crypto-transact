import { Footer, Navbar,Transactions, Welcome } from "./components";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <div>
        <Transactions />
        <Footer />
      </div>
    </div>
  );
};

export default App;
