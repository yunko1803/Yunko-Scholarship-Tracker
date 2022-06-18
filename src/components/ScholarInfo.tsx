import './ScholarInfo.scss';

import React from 'react';
import classNames from 'classnames';
import { Scholar, IScholarInfo } from '../models';

type Props = {
  className?: string;
  scholar: IScholarInfo;
  index: number;
  onClickDeleteScholar: (scholar: IScholarInfo) => void;
  propagateData: (data: any) => void;
  onClickEditScholar: (scholar: Scholar) => void;
  groupId: string;
};

const ScholarInfo: React.FC<Props> = ({ className, scholar, index, onClickDeleteScholar, onClickEditScholar }) => {
  const scholarSharing = scholar.scholarShare / 100;

  return (
    <div
      className={classNames('ScholarInfo', className, {
        'ScholarInfo--even': index % 2 === 1,
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
        {scholar.totalSLP}
      </div>
      {/* <div className="ScholarInfo__claimed hidden-in-mobile">
        {scholar.claimedSLP}
      </div> */}
      <div className="ScholarInfo__total">
        {scholar.totalSLP}
      </div>
      <div className="ScholarInfo__days">
        {scholar.days}
      </div>
      <div className="ScholarInfo__mmr">
        {scholar.elo}
        {/* soon */}
      </div>
      <div className="ScholarInfo__rank">
        {scholar.rank}
        {/* soon */}
      </div>
      <div className="ScholarInfo__sharing">
        {`${Math.ceil(scholar.totalSLP * scholarSharing)} / ${scholar.totalSLP - Math.ceil(scholar.totalSLP * scholarSharing)}`}
      </div>
      <div
        className="ScholarInfo__action"
      >
        <div
          className="ScholarInfo__action__icon edit"
          onClick={onClickEdit}
        >
          <img
            className="ScholarInfo__action__icon__x"
            src={process.env.PUBLIC_URL + '/images/pencil.png'}
          />
        </div>
        <div
          className="ScholarInfo__action__icon delete"
          onClick={onClickDelete}
        >
          <img
            className="ScholarInfo__action__icon__x"
            src={process.env.PUBLIC_URL + '/images/x.png'}
          />
        </div>
      </div>
    </div>
  );

  function onClickDelete() {
    // eslint-disable-next-line
    if (!confirm('Would you like to delete this scholar?')) return;

    onClickDeleteScholar(scholar);
  }

  function onClickEdit() {
    onClickEditScholar({
      name: scholar.name,
      walletAddress: scholar.walletAddress,
      groupId: scholar.groupId,
      scholarId: scholar.scholarId,
      scholarShare: scholar.scholarShare
    })
  }
};

export default ScholarInfo;
