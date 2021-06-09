import React from 'react';
import classNames from 'classnames';
import { IGroup } from '../models';
import GroupInfo from '../components/GroupInfo';

type Props = {
  className?: string;
  groups: IGroup[];
  manager: string;
  uid: string;
  dbId: string;
  onClickEditGroup: (newGroups: IGroup[]) => void;
};

const GroupList: React.FC<Props> = ({ className, groups, manager, uid, dbId, onClickEditGroup }) => {

  return (
    <div className={classNames('GroupList', className)}>
      {groups.map((group, i) => (
        <GroupInfo
          key={group.id}
          groups={groups}
          group={group}
          index={i + 1}
          manager={manager}
          uid={uid}
          dbId={dbId}
          onClickEditGroup={onClickEditGroup}
        />
      ))}
    </div>
  );
};

export default GroupList;
