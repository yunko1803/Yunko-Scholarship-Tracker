import './GroupTableHeader.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const GroupTableHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('GroupTableHeader', className)}>
    </div>
  );
};

export default GroupTableHeader;