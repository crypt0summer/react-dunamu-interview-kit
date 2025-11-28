// 상태용
export interface WalletState {
  address: string | null;
  balance: string | null;
}

// UI용 props
export default interface WalletInfoProps {
  address: string; 
  balance: string | null; // balance는 optional하게 유지
}