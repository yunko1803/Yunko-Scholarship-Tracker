import './ScholarTableHeader.scss';

import React from 'react';
import classNames from 'classnames';
import SvgIcon from '../components/SvgIcon';

type Props = {
  className?: string;
  onClickSortByFeature: (str: string) => void;
  sorter: any;
};

const ScholarTableHeader: React.FC<Props> = ({ className, onClickSortByFeature, sorter }) => {
  const { iteratee, order } = sorter;

  return (
    <div className={classNames('ScholarTableHeader', className)}>
      <div className="ScholarTableHeader__upper Gilroy">
        Scholars
      </div>

      <div className="ScholarTableHeader__downer Gilroy">
        <div className="ScholarTableHeader__downer--id">
          ID
        </div>
        <div
          className="ScholarTableHeader__downer--name"
          onClick={() => onClickSortByFeature('name')}
        >
          Name
          {
            iteratee === 'name' && (
              <SvgIcon
                className={classNames('ScholarTableHeader__downer--name__icon', {
                  'ScholarTableHeader__downer--name__icon--upward': order === 'asc'
                })}
                icon="arrow-down"
              />
            )
          }
        </div>
        <div
          className="ScholarTableHeader__downer--average"
          onClick={() => onClickSortByFeature('averageSLP')}
        >
          Average
          {
            iteratee === 'averageSLP' && (
              <SvgIcon
                className={classNames('ScholarTableHeader__downer--average__icon', {
                  'ScholarTableHeader__downer--average__icon--upward': order === 'asc'
                })}
                icon="arrow-down"
              />
            )
          }
        </div>
        <div
          className="ScholarTableHeader__downer--unclaimed hidden-in-mobile"
          onClick={() => onClickSortByFeature('unclaimedSLP')}
        >
          Unclaimed
          {
            iteratee === 'unclaimedSLP' && (
              <SvgIcon
                className={classNames('ScholarTableHeader__downer--unclaimed__icon', {
                  'ScholarTableHeader__downer--unclaimed__icon--upward': order === 'asc'
                })}
                icon="arrow-down"
              />
            )
          }
        </div>
        {/* <div
          className="ScholarTableHeader__downer--claimed hidden-in-mobile"
          onClick={() => onClickSortByFeature('claimedSLP')}
        >
          Claimed
          {
            iteratee === 'claimedSLP' && (
              <SvgIcon
                className={classNames('ScholarTableHeader__downer--claimed__icon', {
                  'ScholarTableHeader__downer--claimed__icon--upward': order === 'asc'
                })}
                icon="arrow-down"
              />
            )
          }
        </div> */}
        <div
          className="ScholarTableHeader__downer--total"
          onClick={() => onClickSortByFeature('totalSLP')}
        >
          Total
          {
            iteratee === 'totalSLP' && (
              <SvgIcon
                className={classNames('ScholarTableHeader__downer--total__icon', {
                  'ScholarTableHeader__downer--total__icon--upward': order === 'asc'
                })}
                icon="arrow-down"
              />
            )
          }
        </div>
        <div
          className="ScholarTableHeader__downer--days hidden-in-mobile"
          onClick={() => onClickSortByFeature('days')}
        >
          Days
          {
            iteratee === 'days' && (
              <SvgIcon
                className={classNames('ScholarTableHeader__downer--days__icon', {
                  'ScholarTableHeader__downer--days__icon--upward': order === 'asc'
                })}
                icon="arrow-down"
              />
            )
          }
        </div>
        <div
          className="ScholarTableHeader__downer--mmr"
          onClick={() => onClickSortByFeature('elo')}
        >
          MMR
          {
            iteratee === 'elo' && (
              <SvgIcon
                className={classNames('ScholarTableHeader__downer--mmr__icon', {
                  'ScholarTableHeader__downer--mmr__icon--upward': order === 'asc'
                })}
                icon="arrow-down"
              />
            )
          }
        </div>
        <div
          className="ScholarTableHeader__downer--rank hidden-in-mobile"
          onClick={() => onClickSortByFeature('rank')}
        >
          Rank
          {
            iteratee === 'rank' && (
              <SvgIcon
                className={classNames('ScholarTableHeader__downer--rank__icon', {
                  'ScholarTableHeader__downer--rank__icon--upward': order === 'asc'
                })}
                icon="arrow-down"
              />
            )
          }
        </div>
        <div className="ScholarTableHeader__downer--sharing hidden-in-mobile">
          S / M
        </div>
        <div className="ScholarTableHeader__downer--action hidden-in-mobile">
          Action
        </div>
      </div>
    </div>
  );
};

export default ScholarTableHeader;
