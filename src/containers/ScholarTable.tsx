import './ScholarTable.scss';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ScholarTableHeader from './ScholarTableHeader';
import { IGroup, Scholar } from '../models/index';
import useSWR from 'swr';
import ScholarList from './ScholarList';

type Props = {
  className?: string;
  groupId: string;
  scholars: Scholar[];
  onClickDeleteScholar: (scholar: Scholar) => void;
  propagateData: (data: any) => void;
};

const ScholarTable: React.FC<Props> = ({ className, groupId, scholars, onClickDeleteScholar, propagateData }) => {
  // const { data } = useSWR<Data[]>(scholars.map(s => s.name).join(';'), loadData)

  return (
    <div className={classNames('ScholarTable', className)}>
      <ScholarTableHeader />
      <ScholarList
        scholars={scholars}
        onClickDeleteScholar={onClickDeleteScholar}
        propagateData={propagateData}
        groupId={groupId}
      />
    </div>
  );

  // async function loadData() {
  //   let ary = await Promise.all(scholars.map(async scholar => {
  //     return await (async () => {
  //       let address = scholar.walletAddress;
  //       const response = await get<any>(`https://lunacia.skymavis.com/game-api/clients/${address}/items?offset=0&limit=1`);
  //       const items = response.items;
  //       return {
  //         name: scholar.name,
  //         walletAddress: scholar.walletAddress,
  //         totalSLP: items[0].total,
  //         lastClaimed: items[0].last_claimed_item_at
  //       }
  //     })();
  //   }));

  //   return ary;
  // }
};

export default ScholarTable;
