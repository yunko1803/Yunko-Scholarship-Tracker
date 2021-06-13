import './Statistic.scss';

import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import Loading from './Loading';

type Props = {
  className?: string;
  scholars: any[];
};

const Statistic: React.FC<Props> = ({ className, scholars }) => {
  const maxSLPScholar = lodash.maxBy(scholars, (scholar) => scholar.total);
  const maxAverageSLPScholar = lodash.maxBy(scholars, (scholar) => scholar.averageSLP);
  const totalSLP = lodash.sumBy(scholars, scholar => scholar.total);

  if (lodash.isEmpty(scholars)) return <div></div>;

  return (
    <div className={classNames('Statistic', className)}>
      <div className="Statistic__info maxSLP">
        <span className="Statistic__info__title">Best SLP Collector</span>
        {!maxSLPScholar ? <Loading /> : (
          <div>
            {maxSLPScholar.name}: {maxSLPScholar.total}
          </div>
        )}
      </div>
      <div className="Statistic__info maxAverage">
        <span className="Statistic__info__title">Best Average SLP Collector</span>
        {!maxAverageSLPScholar ? <Loading /> : (
          <div>
            {maxAverageSLPScholar.name}: {maxAverageSLPScholar.averageSLP}
          </div>
        )}
      </div>
      <div className="Statistic__info total">
        <span className="Statistic__info__title">Total SLP</span>
        {!totalSLP ? <Loading /> : (
          <div>
            {totalSLP}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistic;
