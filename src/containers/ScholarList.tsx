import React from 'react';
import classNames from 'classnames';
import { Scholar } from '../models';
import ScholarInfo from '../components/ScholarInfo';

type Props = {
  className?: string;
  scholars: Scholar[];
};

const ScholarList: React.FC<Props> = ({ className, scholars }) => {

  return (
    <div className={classNames('ScholarList', className)}>
      {scholars.map((scholar, index) => (
        <ScholarInfo
          key={scholar.walletAddress}
          index={index}
          scholar={scholar}
        />
      ))}
    </div>
  );
};

export default ScholarList;
