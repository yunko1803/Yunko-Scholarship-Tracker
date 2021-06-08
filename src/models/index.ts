export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface Scholar {
  name?: string;
  walletAddress?: string;
  group?: string;
  scholarId?: string;
}

export interface IScholarInfo {
  name?: string;
  walletAddress?: string;
  totalSLP: number;
  claimedSLP: number;
  lastClaimed: number;
  averageSLP: number;
  days: number;
}
