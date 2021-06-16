import './ScholarList.scss';

import React from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { Scholar, IScholarInfo } from '../models';
import ScholarInfo from '../components/ScholarInfo';
import Loading from '../components/Loading';
import EmptyScholars from './EmptyScholars';

type Props = {
  className?: string;
  scholars: Scholar[];
  onClickDeleteScholar: (scholar: Scholar) => void;
  propagateData: (data: any) => void;
  groupId: string;
  data?: IScholarInfo[];
  manager: string;
};

const ScholarList: React.FC<Props> = ({ className, scholars, data, onClickDeleteScholar, propagateData, groupId, manager, }) => {

  if (isEmpty(data) && !isEmpty(scholars)) return <Loading className="ScholarList__loading" />;
  if (isEmpty(data) && isEmpty(scholars))
    return (
      <EmptyScholars
        manager={manager}
      />
    );

  return (
    <div className={classNames('ScholarList', className)}>
      {/* {scholars.map((scholar, index) => (
        <ScholarInfo
          key={scholar.walletAddress}
          index={index}
          scholar={scholar}
          onClickDeleteScholar={onClickDeleteScholar}
          propagateData={propagateData}
          groupId={groupId}
        />
      ))} */}
      {data!.map((scholar, index) => (
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
