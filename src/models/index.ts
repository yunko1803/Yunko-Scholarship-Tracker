export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface Scholar {
  name?: string;
  walletAddress?: string;
  groupId?: string;
  scholarId: string;
  scholarShare: number;
}

export interface IScholarInfo {
  groupId?: string;
  name?: string;
  walletAddress?: string;
  totalSLP: number;
  claimedSLP: number;
  lastClaimed: number;
  averageSLP: number;
  unclaimedSLP: number;
  days: number;
  scholarId: string;
  scholarShare: number;
  winTotal: number;
  rank: number;
  loseTotal: number;
  drawTotal: number;
  elo: number;
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

export interface IUser {
  uid: string;
  name: string;
}
