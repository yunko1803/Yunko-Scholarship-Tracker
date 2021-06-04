import './ScholarInfo.scss';

import React from 'react';
import classNames from 'classnames';
import { Scholar, IScholarInfo } from '../models';
import useSWR from 'swr';
import { get } from '../apis/request';

type Props = {
  className?: string;
  scholar: Scholar;
  index: number;
};

const ScholarInfo: React.FC<Props> = ({ className, scholar, index }) => {
  const { data } = useSWR<IScholarInfo>(`https://lunacia.skymavis.com/game-api/clients/${scholar.walletAddress}/items?offset=0&limit=1`, loadScholar);

  return (
    <div className={classNames('ScholarInfo', className)}>
      <div className="ScholarInfo__id">
        {index + 1}
      </div>
      <div className="ScholarInfo__name">
        {data?.name}
      </div>
      <div className="ScholarInfo__SLP">
        <div className="ScholarInfo__SLP__detail">
          Average
        </div>
        <div className="ScholarInfo__SLP__detail">
          Unclaimed
        </div>
        <div className="ScholarInfo__SLP__detail">
          Claimed
        </div>
        <div className="ScholarInfo__SLP__detail">
          {data?.totalSLP}
        </div>
      </div>
      <div className="ScholarInfo__claimed">
        claimed
      </div>
      <div className="ScholarInfo__action">
        action
      </div>
    </div>
  );

  async function loadScholar() {
    const address = scholar.walletAddress;
    const response = await get<any>(`https://lunacia.skymavis.com/game-api/clients/${address}/items?offset=0&limit=1`);
    const items = response.items;

    return {
      name: scholar.name,
      walletAddress: scholar.walletAddress,
      totalSLP: items[0].total,
      lastClaimed: items[0].last_claimed_item_at,
      databaseId: scholar.id,
    }
  }
};

export default ScholarInfo;
