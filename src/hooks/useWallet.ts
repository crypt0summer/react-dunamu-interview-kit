import { useState, useCallback, useEffect } from "react";
import { BrowserProvider, Contract, ethers } from "ethers";

const MESSAGE_TO_SIGN = "Hello from Dunamu FE Test";

interface WalletState {
  address: string | null;
  balance: string | null; // ETH (포맷된 문자열)
  balanceStatus: "idle" | "loading" | "success" | "error";
  signature: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    balance: null,
    balanceStatus: "idle",
    signature: null,
    isLoading: false,
    error: null,
  });
    

  // 1. 지갑 연결
  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setState((prev) => ({ ...prev, error: "MetaMask가 설치되어 있지 않습니다." }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, balanceStatus : "loading", error: null }));

    try {
      // MetaMask에 연결 요청
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length === 0) throw new Error("계정을 찾을 수 없습니다.");

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // 잔액 조회
      const balanceBigInt = await provider.getBalance(address);
      const balance = ethers.formatEther(balanceBigInt);

      setState({
        address,
        balance,
        balanceStatus: "success",
        signature: null,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        balanceStatus: "error",
        error: err?.message || "지갑 연결 실패",
      }));
    }
  }, []);

  // 2. 메시지 서명
  const signMessage = useCallback(async () => {
    if (!state.address) {
      setState((prev) => ({ ...prev, error: "지갑을 먼저 연결해주세요." }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const signature = await signer.signMessage(MESSAGE_TO_SIGN);

      setState((prev) => ({
        ...prev,
        signature,
        isLoading: false,
        error: null,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        balanceStatus: "error",
        error: err?.message.includes("User denied")
          ? "서명을 거부하셨습니다."
          : err?.message || "서명 실패",
      }));
    }
  }, [state.address]);
  
  return {
    ...state,
    connectWallet,
    signMessage,
    MESSAGE_TO_SIGN,
    disconnect: () => {
      setState({
        address: null,
        balance: null,
        balanceStatus: "idle",
        signature: null,
        isLoading: false,
        error: null,
      });
    },
  };
}
