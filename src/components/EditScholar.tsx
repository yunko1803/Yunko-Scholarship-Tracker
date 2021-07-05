import './EditScholar.scss';

import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import web3 from 'web3';
import Dropdown from './Dropdown';
import { IGroup, Scholar } from '../models';
import { isMobile } from '../utils/misc';

type Props = {
  className?: string;
  scholar: Scholar;
  groups: IGroup[];
  editScholar: (scholar: Scholar) => void;
  onClickcloseModal: () => void;
};

const EditScholar: React.FC<Props> = ({ className, scholar, groups, editScholar, onClickcloseModal }) => {
  const [name, setName] = React.useState(scholar.name ?? 'none');
  const [address, setAddress] = React.useState(scholar.walletAddress!.replace('0x', 'ronin:'));
  const [scholarShare, setScholarShare] = React.useState(scholar.scholarShare);
  const selectedGroup = groups.filter((group) => group.id === scholar.groupId);
  const [group, setGroup] = React.useState(selectedGroup[0].name);

  return (
    <div className={classNames('EditScholar', className)}>
      <div className="EditScholar__first">
        <Dropdown
          className="EditScholar__first__group"
          buttonClassName="EditScholar__first__group__button"
          items={lodash.isEmpty(groups) ? [] : groups.filter((group) => group.name !== 'Total').map((group) => group.name)}
          defaultValue={group}
          onChange={setGroup}
        />
        <div
          className="EditScholar__first__border"
        />
        <input
          className="EditScholar__first__name"
          placeholder="Name of Scholar"
          value={name}
          onChange={handleChangeName}
        />
      </div>

      <input
        className="EditScholar__second"
        placeholder="ronin:blahblahblah0123456789abcdef"
        value={address}
        onChange={handleChangeAddress}
      />

      <div className="EditScholar__sharing">
        <div className="EditScholar__sharing__scholar">
          <div className="EditScholar__sharing__scholar__label">{isMobile() ? 'Scholar' : 'Scholar Share'}</div>
          <div
            className="EditScholar__first__border"
          />
          <input
            className="EditScholar__sharing__scholar__input"
            placeholder="Scholar Share (%)"
            value={scholarShare}
            onChange={handleChangeShare}
          />
        </div>
        <div className="EditScholar__sharing__manager hidden-in-mobile">
          <div className="EditScholar__sharing__manager__label">Manager Share</div>
          <div
            className="EditScholar__first__border"
          />
          <input
            className="EditScholar__sharing__manager__input"
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
        className="EditScholar__button Gilroy"
        onClick={onClickAddScholar}
      >
        + Add
      </button>
    </div>
  );

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setName(name);
  }

  function handleChangeAddress(e: React.ChangeEvent<HTMLInputElement>) {
    const walletAddress = e.target.value;
    setAddress(walletAddress);
  }

  function handleChangeShare(e: React.ChangeEvent<HTMLInputElement>) {
    const share = parseInt(e.target.value.replace(/\D/g, ''));
    if (share > 100) return;

    setScholarShare(share);
  }

  function onClickAddScholar() {
    const ethAddress = address.replace('ronin:', '0x');
    if (!name || !web3.utils.isAddress(ethAddress) || !group) {
      alert('Please don\'t let group, name of scholar, and eth address empty!');
      return;
    }

    const selectedGroup = groups.filter(singleGroup => singleGroup.name === group);

    editScholar({
      name,
      groupId: selectedGroup[0].id,
      walletAddress: ethAddress,
      scholarShare,
      scholarId: scholar.scholarId,
    });
    onClickcloseModal();
  }
};

export default EditScholar;
