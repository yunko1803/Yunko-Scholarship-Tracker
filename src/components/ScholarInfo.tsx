import './ScholarInfo.scss';

import React from 'react';
import classNames from 'classnames';
import { Scholar, IScholarInfo } from '../models';
import useSWR from 'swr';
import { get } from '../apis/request';
import Loading from './Loading';

type Props = {
  className?: string;
  scholar: IScholarInfo;
  index: number;
  onClickDeleteScholar: (scholar: Scholar) => void;
  propagateData: (data: any) => void;
  groupId: string;
};

const ScholarInfo: React.FC<Props> = ({ className, scholar, index, onClickDeleteScholar, propagateData, groupId }) => {
  // const { data } = useSWR<IScholarInfo>(`https://lunacia.skymavis.com/game-api/clients/${scholar.walletAddress}/items?offset=0&limit=1`, loadScholar);

  // if (!data) {
  //   return (
  //     <Loading className="ScholarInfo__loading" />
  //   );
  // }

  // if (scholar.days < 14) return <></>;

  return (
    <div
      className={classNames('ScholarInfo', className, {
        'ScholarInfo--even': index % 2 == 1,
      })}
    >
      <div className="ScholarInfo__id">
        {index + 1}
      </div>
      <div className="ScholarInfo__name">
        {scholar.name}
      </div>
      <div className="ScholarInfo__average">
        {scholar.averageSLP}
      </div>
      <div className="ScholarInfo__unclaimed">
        {scholar.totalSLP - scholar.claimedSLP}
      </div>
      <div className="ScholarInfo__claimed">
        {scholar.claimedSLP}
      </div>
      <div className="ScholarInfo__total">
        {scholar.totalSLP}
      </div>
      <div className="ScholarInfo__days">
        {scholar.days}
      </div>
      <div
        className="ScholarInfo__action"
        onClick={onClickDelete}
      >
        <div
          className="ScholarInfo__action__icon"
        >
          <img
            className="ScholarInfo__action__icon__x"
            src={process.env.PUBLIC_URL + '/images/x.png'}
          />
        </div>
      </div>
    </div>
  );

  // async function loadScholar() {
  //   const address = scholar.walletAddress;
  //   const response = await get<any>(`https://lunacia.skymavis.com/game-api/clients/${address}/items?offset=0&limit=1`);
  //   const items = response.items;
  //   const scholarData = items[0];
  //   const today = new Date();
  //   const difference = Math.abs(today.getTime() - scholarData.last_claimed_item_at * 1000) / 86400000;
  //   const differenceDays = Math.floor(difference) + 1;
  //   const averageSLP = Math.floor((scholarData.total - scholarData.claimable_total) / differenceDays);
  //   const scholarInfo = { ...scholarData, groupId, averageSLP, name: scholar.name };
  //   window.propagateQueue = { ...window.propagateQueue, [scholarData.client_id]: scholarInfo };
  //   propagateData(window.propagateQueue);

  //   return {
  //     name: scholar.name,
  //     walletAddress: scholar.walletAddress,
  //     totalSLP: scholarData.total,
  //     claimedSLP: scholarData.claimable_total,
  //     lastClaimed: scholarData.last_claimed_item_at,
  //     averageSLP: averageSLP,
  //     days: differenceDays,
  //   }
  // }

  function onClickDelete() {
    // eslint-disable-next-line
    if (!confirm('Would you like to delete this scholar?')) return;

    onClickDeleteScholar(scholar);
  }
};

export default ScholarInfo;
