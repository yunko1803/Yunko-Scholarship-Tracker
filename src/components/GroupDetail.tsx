import './GroupDetail.scss';

import React from 'react';
import classNames from 'classnames';
import { IGroup } from '../models';
import GroupTable from '../containers/GroupTable';
import GroupInput from './GroupInput';

type Props = {
  className?: string;
  groups: IGroup[];
  manager: string;
  uid: string;
  dbId: string;
  onClickEditGroup: (newGroups: IGroup[]) => void;
};

const GroupDetail: React.FC<Props> = ({ className, groups, manager, uid, dbId, onClickEditGroup }) => {
  return (
    <div className={classNames('GroupDetail', className)}>
      <div className="GroupDetail__title">Group Detail</div>
      <GroupInput
        groups={groups}
        manager={manager}
        uid={uid}
        dbId={dbId}
        onClickEditGroup={onClickEditGroup}
      />
      <GroupTable
        groups={groups}
        manager={manager}
        uid={uid}
        dbId={dbId}
        onClickEditGroup={onClickEditGroup}
      />
    </div>
  );
};

export default GroupDetail;
