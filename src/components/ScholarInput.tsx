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
  onClickLogin: () => void;
};

const ScholarInput: React.FC<Props> = ({ className, groups, addScholar, onClickLogin }) => {
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [group, setGroup] = React.useState(lodash.isEmpty(groups) ? '' : groups[0].name);
  const [cookies] = useCookies(['user']);

  return (
    <div className={classNames('ScholarInput', className)}>
      <div className="ScholarInput__first">
        <Dropdown
          className="ScholarInput__first__group"
          items={lodash.isEmpty(groups) ? [] : groups.filter((group) => group.name !== 'total').map((group) => group.name)}
          onChange={setGroup}
          onClick={openModalClick}
        />
        <input
          className="ScholarInput__first__name"
          placeholder="Name of Scholar"
          value={name}
          onChange={handleChangeName}
          onClick={openModalClick}
        />
      </div>

      <input
        className="ScholarInput__second"
        placeholder="ETH address"
        value={address}
        onChange={handleChangeAddress}
        onClick={openModalClick}
      />
      <button
        className="ScholarInput__button"
        onClick={onClickAddScholar}
        disabled={!cookies.user}
      >
        add
      </button>
    </div>
  );

  function openModalClick() {
    if (!!cookies.user) return;

    onClickLogin();
  }

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
    });
    setName('');
    setAddress('');
  }
};

export default ScholarInput;
