import './GroupDetail.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const GroupDetail: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('GroupDetail', className)}>
    </div>
  );
};

export default GroupDetail;