import React from 'react';
import classNames from 'classnames';
import { Scholar } from '../models';
import ScholarInfo from '../components/ScholarInfo';

type Props = {
  className?: string;
  scholars: Scholar[];
  onClickDeleteScholar: (scholar: Scholar) => void;
  propagateData: (data: any) => void;
  group: string;
};

const ScholarList: React.FC<Props> = ({ className, scholars, onClickDeleteScholar, propagateData, group, }) => {

  return (
    <div className={classNames('ScholarList', className)}>
      {scholars.map((scholar, index) => (
        <ScholarInfo
          key={scholar.walletAddress}
          index={index}
          scholar={scholar}
          onClickDeleteScholar={onClickDeleteScholar}
          propagateData={propagateData}
          group={group}
        />
      ))}
    </div>
  );
};

export default ScholarList;
