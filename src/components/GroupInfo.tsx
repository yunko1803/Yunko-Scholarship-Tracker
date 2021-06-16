import './GroupInfo.scss';

import React from 'react';
import classNames from 'classnames';
import { IGroup } from '../models';
import { db } from '../utils/db';

type Props = {
  className?: string;
  groups: IGroup[];
  group: IGroup;
  index: number;
  manager: string;
  uid: string;
  dbId: string;
  onClickEditGroup: (newGroups: IGroup[]) => void;
};

const GroupInfo: React.FC<Props> = ({ className, groups, group, index, manager, uid, dbId, onClickEditGroup }) => {

  return (
    <div className={classNames('GroupInfo', className, {
      'GroupInfo--even': index % 2 == 0,
    })}>
      <div className="GroupInfo__id">
        {index}
      </div>

      <div className="GroupInfo__name">
        {group.name}
      </div>


      <div className="GroupInfo__total">
        total
      </div>

      <div
        className="GroupInfo__action"
        onClick={onClickDeleteGroup}
      >
        <div
          className="GroupInfo__action__icon"
        >
          <img
            className="GroupInfo__action__icon__x"
            src={process.env.PUBLIC_URL + '/images/x.png'}
          />
        </div>
      </div>
    </div>
  );

  function onClickDeleteGroup() {
    // eslint-disable-next-line
    if (!confirm(`Would you like to delete ${group.name} group?`)) return;

    const newGroups = groups.filter(singleGroup => singleGroup.id !== group.id);
    onClickEditGroup(newGroups);

    db.collection("managers").doc(dbId).set({
      groups: newGroups,
      name: manager,
      uid,
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  }
};

export default GroupInfo;
