import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const GroupTable: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('GroupTable', className)}>
    </div>
  );
};

export default GroupTable;