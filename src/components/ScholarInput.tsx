import './ScholarInput.scss';

import React from 'react';
import classNames from 'classnames';
import web3 from 'web3';
import lodash from 'lodash';
import { useCookies } from "react-cookie";
import Dropdown from './Dropdown';
import { IGroup, Scholar } from '../models';

type Props = {
  className?: string;
  groups: IGroup[];
  addScholar: (scholar: Scholar) => void;
};

const ScholarInput: React.FC<Props> = ({ className, groups, addScholar }) => {
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [group, setGroup] = React.useState(lodash.isEmpty(groups) ? '' : groups[0].name);
  const [cookies] = useCookies(['user']);

  return (
    <div className={classNames('ScholarInput', className)}>
      <div className="ScholarInput__first">
        <Dropdown
          className="ScholarInput__first__group"
          buttonClassName="ScholarInput__first__group__button"
          items={lodash.isEmpty(groups) ? [] : groups.filter((group) => group.name !== 'Total').map((group) => group.name)}
          onChange={setGroup}
        />
        <div
          className="ScholarInput__first__border"
        />
        <input
          className="ScholarInput__first__name"
          placeholder="Name of Scholar"
          value={name}
          onChange={handleChangeName}
        />
      </div>

      <input
        className="ScholarInput__second"
        placeholder="ETH address"
        value={address}
        onChange={handleChangeAddress}
      />
      <button
        className="ScholarInput__button Gilroy"
        onClick={onClickAddScholar}
        disabled={!cookies.user}
      >
        + Add
      </button>
    </div>
  );

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    if (!cookies.user) return;

    const name = e.target.value;
    setName(name);
  }

  function handleChangeAddress(e: React.ChangeEvent<HTMLInputElement>) {
    if (!cookies.user) return;

    const walletAddress = e.target.value;
    setAddress(walletAddress);
  }

  function onClickAddScholar() {
    if (!name || !web3.utils.isAddress(address) || !group) {
      alert('Please don\'t let group, name of scholar, and eth address empty!');
      return;
    }

    const selectedGroup = groups.filter(singleGroup => singleGroup.name === group);

    addScholar({
      name,
      groupId: selectedGroup[0].id,
      walletAddress: address,
      scholarId: '',
    });
    setName('');
    setAddress('');
  }
};

export default ScholarInput;
