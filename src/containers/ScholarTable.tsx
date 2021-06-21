import './ScholarTable.scss';

import React from 'react';
import classNames from 'classnames';
import { orderBy } from 'lodash';
import ScholarTableHeader from './ScholarTableHeader';
import { Scholar, IScholarInfo } from '../models/index';
import ScholarList from './ScholarList';
import { useStateWithPartialSetter } from '../hooks/utils';

type Props = {
  className?: string;
  groupId: string;
  scholars: Scholar[];
  data?: IScholarInfo[];
  onClickDeleteScholar: (scholar: IScholarInfo) => void;
  propagateData: (data: any) => void;
  manager: string;
};

const ScholarTable: React.FC<Props> = ({ className, groupId, scholars, data, onClickDeleteScholar, propagateData, manager }) => {

  const [sorter, setSorter] = useStateWithPartialSetter<{
    iteratee: string;
    order: 'desc' | 'asc';
  }>({
    iteratee: 'averageSLP',
    order: 'desc',
  });

  const sorted = orderBy((data), sorter.iteratee, sorter.order);

  return (
    <div className={classNames('ScholarTable', className)}>
      <ScholarTableHeader
        onClickSortByFeature={handleSorterClick}
        sorter={sorter}
      />
      <ScholarList
        scholars={scholars}
        data={sorted}
        onClickDeleteScholar={onClickDeleteScholar}
        propagateData={propagateData}
        groupId={groupId}
        manager={manager}
      />
    </div>
  );

  function handleSorterClick(iteratee: string) {
    if (sorter.iteratee === iteratee) {
      setSorter({
        order: sorter.order === 'desc' ? 'asc' : 'desc',
      });
      return;
    }

    setSorter({
      iteratee
    });
  }
};

export default ScholarTable;
