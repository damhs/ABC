// 전체 앱을 관리하는 App 컴포넌트
import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import Navbar from "./components/Navbar";
import BandingCurve from "./components/BandingCurve";
import SwapForm from "./components/SwapForm";
import "./styles/App.css";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = [];

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [rate, setRate] = useState(0);
  const [sellToken, setSellToken] = useState("KST");
  const [buyToken, setBuyToken] = useState("SRT");

  const updateTokens = (sell, buy) => {
    setSellToken(sell);
    setBuyToken(buy);
  };
  
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
        
        setProvider(provider);
        setSigner(signer);
        setContract(contract);

        const rate = await contract.setRate();
        setRate(rate);
      }
    };
    init();
  }, []);

  return (
    <div className="app">
      <Navbar provider={provider} />
      <div className="main-content">
        <BandingCurve contract={contract} rate={rate} sellToken={sellToken} buyToken={buyToken} />
        <SwapForm contract={contract} rate={rate} updateTokens={updateTokens} />
      </div>
    </div>
  );
}

export default App;
