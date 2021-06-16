import './Statistic.scss';

import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import Loading from './Loading';
import { IScholarInfo, Scholar } from '../models/index';

type Props = {
  className?: string;
  data?: IScholarInfo[];
  scholars?: Scholar[];
};

const Statistic: React.FC<Props> = ({ className, scholars, data }) => {
  const maxSLPScholar = lodash.maxBy(data, (scholar) => scholar.totalSLP);
  const maxAverageSLPScholar = lodash.maxBy(data, (scholar) => scholar.averageSLP);
  const totalSLP = lodash.sumBy(data, scholar => scholar.totalSLP);

  if (lodash.isEmpty(scholars)) return <div></div>;

  return (
    <div className={classNames('Statistic', className)}>

      <div className="Statistic__info maxSLP">
        <div className="Statistic__info__title Gilroy">
          <img
            className="Statistic__info__title__icon"
            src={process.env.PUBLIC_URL + '/images/best.png'}
          />
          Best SLP Collector
        </div>
        {!maxSLPScholar ? <Loading /> : (
          <div className="Statistic__info__title__detail">
            <div
              className="Statistic__info__title__detail__scholar Gilroy"
              style={{ backgroundColor: '#5892E9' }}
            >
              {maxSLPScholar.name}
            </div>
            <div className="Statistic__info__title__detail__number Gilroy">
              {maxSLPScholar.totalSLP}
            </div>
          </div>
        )}
      </div>

      <div className="Statistic__info maxAverage">
        <div className="Statistic__info__title Gilroy">
          <img
            className="Statistic__info__title__icon"
            src={process.env.PUBLIC_URL + '/images/crown.png'}
          />
          Best Average SLP Collector
        </div>
        {!maxAverageSLPScholar ? <Loading /> : (
          <div className="Statistic__info__title__detail">
            <div
              className="Statistic__info__title__detail__scholar Gilroy"
              style={{ backgroundColor: '#7BD74F' }}
            >
              {maxAverageSLPScholar.name}
            </div>
            <div className="Statistic__info__title__detail__number Gilroy">
              {maxAverageSLPScholar.averageSLP}
            </div>
          </div>
        )}
      </div>

      <div className="Statistic__info total">
        <div className="Statistic__info__title Gilroy">
          <img
            className="Statistic__info__title__icon"
            src={process.env.PUBLIC_URL + '/images/SLP.png'}
          />
          Total SLP
        </div>
        {!totalSLP ? <Loading /> : (
          <div className="Statistic__info__title__detail__number Gilroy">
            {totalSLP}
          </div>
        )}
      </div>

    </div>
  );
};

export default Statistic;
