import './GroupInput.scss';

import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import { IGroup } from '../models';
import { db } from '../utils/db';

type Props = {
  className?: string;
  groups: IGroup[];
  manager: string;
  uid: string;
  dbId: string;
  onClickEditGroup: (newGroups: IGroup[]) => void;
};

const GroupInput: React.FC<Props> = ({ className, groups, manager, uid, dbId, onClickEditGroup }) => {
  const [name, setName] = React.useState('');

  return (
    <div className={classNames('GroupInput', className)}>
      <input
        className="GroupInput__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group Name"
      />
      <button
        className="GroupInput__button"
        onClick={addGroup}
      >
        add
      </button>
    </div>
  );

  function addGroup() {
    setName('');
    const greatestIdGroup = lodash.maxBy(groups, group => parseInt(group.id));
    const nextId = (parseInt(greatestIdGroup!.id) + 1) + '';
    const newGroups = [...groups, {
      id: nextId,
      name
    }];
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

export default GroupInput;
