import React, {useState} from 'react';
import { BrowserProvider } from 'ethers';
import '../styles/Navbar.css';

function Navbar() {
  // 지갑 주소를 상태로 관리
  const [walletAddress, setWalletAddress] = useState('');

  // Metamask와 연결하는 함수
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // 사용자가 계정 접근을 요청하도록 함
        const signer = await provider.getSigner(); // 서명자를 가져옴
        const address = await signer.getAddress(); // signer.getAddress()를 사용해 주소를 가져옴
        setWalletAddress(address); // 주소를 상태에 저장
        console.log(address);
      } catch (error) {
        console.error("Metamask 연결 실패:", error);
      }
    } else {
      alert("Metamask가 설치되지 않았습니다.");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">ABC</div>
      
      {/* 지갑 주소가 없을 때 Metamask 연결 버튼 표시 */}
      {walletAddress ? (
        <div className="wallet-address">
          {walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4)}
        </div>
      ) : (
        <button className="connect-wallet" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </header>
  );
}

export default Navbar;
