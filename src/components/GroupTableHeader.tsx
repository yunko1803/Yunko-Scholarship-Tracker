import './GroupTableHeader.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const GroupTableHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('GroupTableHeader', className)}>
      <div className="GroupTableHeader__id Gilroy">
        ID
      </div>
      <div className="GroupTableHeader__name Gilroy">
        Name
      </div>
      <div className="GroupTableHeader__totalScholars Gilroy">
        Total
      </div>
      <div className="GroupTableHeader__delete Gilroy">
        Action
      </div>
    </div>
  );
};

export default GroupTableHeader;
