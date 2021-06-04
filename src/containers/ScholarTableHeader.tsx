import './ScholarTableHeader.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const ScholarTableHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('ScholarTableHeader', className)}>
      <div className="ScholarTableHeader__id">
        id
      </div>
      <div className="ScholarTableHeader__name">
        name
      </div>
      <div className="ScholarTableHeader__SLP">
        <div className="ScholarTableHeader__title">SLP</div>
        <div className="ScholarTableHeader__SLP__detail">
          <div className="ScholarTableHeader__SLP__detail average">
            Average
          </div>
          <div className="ScholarTableHeader__SLP__detail unclaimed">
            Unclaimed
          </div>
          <div className="ScholarTableHeader__SLP__detail claimed">
            Claimed
          </div>
          <div className="ScholarTableHeader__SLP__detail total">
            Total
          </div>
        </div>
      </div>
      <div className="ScholarTableHeader__claimed">
        Days
      </div>
      <div className="ScholarTableHeader__action">
        action
      </div>
    </div>
  );
};

export default ScholarTableHeader;
