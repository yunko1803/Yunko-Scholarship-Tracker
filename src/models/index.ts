export interface Scholar {
  name?: string;
  walletAddress?: string;
  id: string;
}

export interface IScholarInfo {
  name?: string;
  walletAddress?: string;
  totalSLP: number;
  lastClaimed: number;
}
