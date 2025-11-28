import WalletInfoProps from "@/interface/Wallet";

export function WalletInfo({ address, balance } : WalletInfoProps) {
    return (
        <div>
            <div> 지갑 주소 {address} </div>
            <div> 잔고: {balance} ETH </div>
        </div>
    )
}