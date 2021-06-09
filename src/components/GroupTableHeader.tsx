import './GroupTableHeader.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const GroupTableHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('GroupTableHeader', className)}>
      <div className="GroupTableHeader__id">
        id
      </div>
      <div className="GroupTableHeader__name">
        name
      </div>
      <div className="GroupTableHeader__totalScholars">
        total
      </div>
      <div className="GroupTableHeader__delete">
        delete
      </div>
    </div>
  );
};

export default GroupTableHeader;
