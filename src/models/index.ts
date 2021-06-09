export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface Scholar {
  name?: string;
  walletAddress?: string;
  groupId?: string;
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

export interface IGroup {
  id: string;
  name: string;
}

export interface IManager {
  groups: IGroup[],
  name: string,
  uid: string,
}
