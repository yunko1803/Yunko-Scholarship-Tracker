import './Header.scss';

import React from 'react';
import classNames from 'classnames';
import Logo from './Logo';
import { useCookies } from 'react-cookie';
import { greets } from '../utils/constants';

type Props = {
  className?: string;
  manager: string;
  onClickLogin: () => void;
  onClickLogout: () => void;
};

const Header: React.FC<Props> = ({ className, manager, onClickLogin, onClickLogout }) => {
  const randomIndex = Math.floor(Math.random() * greets.length);
  const [cookies, setCookie] = useCookies(['user']);
  const isLoggedIn = !!cookies.user;

  return (
    <div className={classNames('Header', className)}>
      <div className="Header__logo">
        <img
          className="Header__logo__img"
          src={process.env.PUBLIC_URL + '/images/logo3.png'}
        />
        <Logo />
      </div>

      {isLoggedIn && (
        <div className="Header__user">
          <span className="Header__user__greeting">
            Welcome,
          </span>
          {' '}
          <span className="Header__user__name Gilroy">
            {manager}!
          </span>
        </div>
      )}

      <button
        className={classNames('Header__authentication Gilroy', {
          'Header__authentication--logout': isLoggedIn,
        })}
        onClick={isLoggedIn ? onClickLogout : onClickLogin}
      >
        {isLoggedIn ? 'Log Out' : 'Login'}
      </button>
    </div>
  );
};

export default Header;
