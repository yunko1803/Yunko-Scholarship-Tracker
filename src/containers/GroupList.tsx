import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const GroupList: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('GroupList', className)}>
    </div>
  );
};

export default GroupList;