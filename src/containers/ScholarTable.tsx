import './ScholarTable.scss';

import React from 'react';
import classNames from 'classnames';
import { orderBy } from 'lodash';
import ScholarTableHeader from './ScholarTableHeader';
import { Scholar, IScholarInfo } from '../models/index';
import ScholarList from './ScholarList';
import { useStateWithPartialSetter } from '../hooks/utils';
import exportFromJSON from 'export-from-json'

type Props = {
  className?: string;
  groupId: string;
  scholars: Scholar[];
  unsortedData?: IScholarInfo[];
  onClickDeleteScholar: (scholar: IScholarInfo) => void;
  propagateData: (data: any) => void;
  manager: string;
  onClickEditScholar: (scholar: Scholar) => void;
};

const ScholarTable: React.FC<Props> = ({ className, groupId, scholars, unsortedData, onClickDeleteScholar, propagateData, manager, onClickEditScholar }) => {
  const fileName = 'scholarship'
  const exportType = 'xls'

  const [sorter, setSorter] = useStateWithPartialSetter<{
    iteratee: string;
    order: 'desc' | 'asc';
  }>({
    iteratee: 'averageSLP',
    order: 'desc',
  });

  const data = orderBy((unsortedData), sorter.iteratee, sorter.order);

  return (
    <div className={classNames('ScholarTable', className)}>
      <button
        className="ScholarTable__excel"
        onClick={() => exportFromJSON({ data, fileName, exportType }) }
      >
        <span className="Gilroy">Excel</span>
      </button>
      <ScholarTableHeader
        onClickSortByFeature={handleSorterClick}
        sorter={sorter}
      />
      <ScholarList
        scholars={scholars}
        data={data}
        onClickDeleteScholar={onClickDeleteScholar}
        propagateData={propagateData}
        groupId={groupId}
        manager={manager}
        onClickEditScholar={onClickEditScholar}
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
