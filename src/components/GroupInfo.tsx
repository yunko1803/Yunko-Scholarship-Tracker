import './GroupInfo.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const GroupInfo: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('GroupInfo', className)}>
    </div>
  );
};

export default GroupInfo;