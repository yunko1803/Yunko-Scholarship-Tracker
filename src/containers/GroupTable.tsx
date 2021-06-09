import './GroupTable.scss';

import React from 'react';
import classNames from 'classnames';
import GroupTableHeader from '../components/GroupTableHeader';
import GroupList from './GroupList';
import { IGroup } from '../models';

type Props = {
  className?: string;
  groups: IGroup[];
  manager: string;
  uid: string;
  dbId: string;
  onClickEditGroup: (newGroups: IGroup[]) => void;
};

const GroupTable: React.FC<Props> = ({ className, groups, manager, uid, dbId, onClickEditGroup }) => {
  return (
    <div className={classNames('GroupTable', className)}>
      <GroupTableHeader />
      <GroupList
        groups={groups}
        manager={manager}
        uid={uid}
        dbId={dbId}
        onClickEditGroup={onClickEditGroup}
      />
    </div>
  );
};

export default GroupTable;
