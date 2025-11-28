import { WalletInfo } from "@/components/WalletInfo"
import { useWallet } from "@/hooks/useWallet";

export default function Day6(){
    
    const {
        address,
        balance,
        balanceStatus,
        signature,
        isLoading,
        error,
        connectWallet,
        signMessage,
        MESSAGE_TO_SIGN,
    } = useWallet();

    return(<div>

        <h2>Ethereum Wallet을 연결해보자</h2>

        {!address ? (
        <button onClick={connectWallet} disabled={isLoading}>
          {isLoading ? "연결 중..." : "MetaMask 연결"}
        </button>
      ) : (
        <div>
          {address && (
                <WalletInfo address={address} balance={balance} />
            )}

          <button onClick={signMessage} disabled={isLoading}>
            {isLoading ? "서명 중..." : "Sign Message"}
          </button>

          {signature && (
            <div style={{ marginTop: "1rem", wordBreak: "break-all" }}>
              <p>
                <strong>서명 결과:</strong>
              </p>
              <code style={{ fontSize: "0.85rem" }}>{signature}</code>
            </div>
          )}
        </div>
      )}
        {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          오류: {error}
        </p>
      )}

      {balanceStatus === "error" && (
        <p>잔고를 불러오지 못했습니다</p>
      )}

      <div style={{ marginTop: "2rem", color: "#666", fontSize: "0.9rem" }}>
        서명할 메시지: <code>{MESSAGE_TO_SIGN}</code>
      </div>
         
    </div>)
    
}