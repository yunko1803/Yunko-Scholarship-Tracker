import './ScholarInput.scss';

import React from 'react';
import classNames from 'classnames';
import web3 from 'web3';
import lodash from 'lodash';
import { useCookies } from "react-cookie";
import Dropdown from './Dropdown';
import { IGroup, Scholar } from '../models';
import { isMobile } from '../utils/misc';

type Props = {
  className?: string;
  groups: IGroup[];
  addScholar: (scholar: Scholar) => void;
};

const ScholarInput: React.FC<Props> = ({ className, groups, addScholar }) => {
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [scholarShare, setScholarShare] = React.useState(0);
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
        placeholder="ronin:blahblahblah0123456789abcdef"
        value={address}
        onChange={handleChangeAddress}
      />

      <div className="ScholarInput__sharing">
        <div className="ScholarInput__sharing__scholar">
          <div className="ScholarInput__sharing__scholar__label">{isMobile() ? 'Scholar' : 'Scholar Share'}</div>
          <div
            className="ScholarInput__first__border"
          />
          <input
            className="ScholarInput__sharing__scholar__input"
            placeholder="Scholar Share (%)"
            value={scholarShare}
            onChange={handleChangeShare}
          />
        </div>
        <div className="ScholarInput__sharing__manager hidden-in-mobile">
          <div className="ScholarInput__sharing__manager__label">Manager Share</div>
          <div
            className="ScholarInput__first__border"
          />
          <input
            className="ScholarInput__sharing__manager__input"
            disabled
            value={100 - scholarShare}
          />
        </div>
      </div>

      <div className="ScholarInput__sharing__manager hidden-in-desktop">
        <div className="ScholarInput__sharing__manager__label">{isMobile() ? 'Manager' : 'Manager Share'}</div>
        <div
          className="ScholarInput__first__border"
        />
        <input
          className="ScholarInput__sharing__manager__input"
          disabled
          value={100 - scholarShare}
        />
      </div>
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

  function handleChangeShare(e: React.ChangeEvent<HTMLInputElement>) {
    const share = parseInt(e.target.value.replace(/\D/g, ''));
    if (!cookies.user || share > 100) return;

    setScholarShare(share);
  }

  function onClickAddScholar() {
    const ethAddress = address.replace('ronin:', '0x');
    if (!name || !web3.utils.isAddress(ethAddress) || !group) {
      alert('Please don\'t let group, name of scholar, and eth address empty!');
      return;
    }

    const selectedGroup = groups.filter(singleGroup => singleGroup.name === group);

    addScholar({
      name,
      groupId: selectedGroup[0].id,
      walletAddress: ethAddress,
      scholarShare,
      scholarId: '',
    });
    setName('');
    setAddress('');
  }
};

export default ScholarInput;
