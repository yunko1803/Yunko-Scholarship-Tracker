import React from 'react';
import classNames from 'classnames';
import { IGroup, Scholar } from '../models';
import ScholarInfo from '../components/ScholarInfo';

type Props = {
  className?: string;
  scholars: Scholar[];
  onClickDeleteScholar: (scholar: Scholar) => void;
  propagateData: (data: any) => void;
  groupId: string;
};

const ScholarList: React.FC<Props> = ({ className, scholars, onClickDeleteScholar, propagateData, groupId, }) => {

  return (
    <div className={classNames('ScholarList', className)}>
      {scholars.map((scholar, index) => (
        <ScholarInfo
          key={scholar.walletAddress}
          index={index}
          scholar={scholar}
          onClickDeleteScholar={onClickDeleteScholar}
          propagateData={propagateData}
          groupId={groupId}
        />
      ))}
    </div>
  );
};

export default ScholarList;
