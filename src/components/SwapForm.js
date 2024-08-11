import React, { useEffect, useState } from 'react';
import '../styles/SwapForm.css';
import { ethers } from 'ethers';

const tokens = ["KST", "SRT"]; // 드롭다운 메뉴에서 선택할 수 있는 토큰 목록

const SwapForm = ({contract, rate, updateTokens}) => {
  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellToken, setSellToken] = useState("KST");
  const [buyToken, setBuyToken] = useState("SRT");

  useEffect(() => {
    updateTokens(sellToken, buyToken);  // 토큰이 변경될 때마다 updateTokens 함수 호출
  }, [sellToken, buyToken]);

  const handleSellAmountChange = (e) => {
    const value = e.target.value;
    setSellAmount(value);
    setBuyAmount(rate / value); // 자동으로 Buy 값 계산
  };

  const handleBuyAmountChange = (e) => {
    const value = e.target.value;
    setBuyAmount(value);
    setSellAmount(rate / value); // 자동으로 Sell 값 계산
  };

  const handleSellTokenChange = (e) => {
    setSellToken(e.target.value);
  };

  const handleBuyTokenChange = (e) => {
    setBuyToken(e.target.value);
  };

  const handleSwap = async () => {
    if (sellToken === "A") {
      await contract.swapAforB(ethers.utils.parseUnits(sellAmount, 18));
    } else {
      await contract.swapBforA(ethers.utils.parseUnits(sellAmount, 18));
    }
  };

  return (
    <div className="swap-form">
      <div className="form-group">
        <div className="token-section">
          <span className="token-label">Sell</span>
          <input 
            type="number" 
            value={sellAmount} 
            onChange={handleSellAmountChange} 
            className="form-input" 
            placeholder="0" 
          />
        </div>
        <div className="token-dropdown">
          <select value={sellToken} onChange={handleSellTokenChange}>
            {tokens.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="arrow">
        ↓
      </div>
      
      <div className="form-group">
        <div className="token-section">
          <span className="token-label">Buy</span>
          <input 
            type="number" 
            value={buyAmount} 
            onChange={handleBuyAmountChange} 
            className="form-input" 
            placeholder="0" 
          />
        </div>
        <div className="token-dropdown">
          <select value={buyToken} onChange={handleBuyTokenChange}>
            {tokens.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
        </div>
      </div>
      
      <button 
        className="go-button" 
        onClick={handleSwap}
        disabled={sellAmount <= 0 || buyAmount <= 0} /* 입력값이 0일 경우 비활성화 */
      >
        {sellAmount > 0 && buyAmount > 0 ? "Go" : "Enter an amount"}
      </button>
    </div>
  );
};

export default SwapForm;
