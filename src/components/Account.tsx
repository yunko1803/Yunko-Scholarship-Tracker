import * as React from 'react';
import classNames from 'classnames';

import './Account.scss';
import Loading from './Loading';
import Logo from './Logo';

type Props = {
  className?: string;
  loginType: string;
  onClickLoginType: (type: string) => void;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  error: string;
  onClickResetError: () => void;
  onClickLoginLoading: () => void;
  isLoginLoading: boolean;
};

const Account: React.FC<Props> = ({ className, loginType, onClickLoginType, login, register, error, onClickResetError, onClickLoginLoading, isLoginLoading }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  return (
    <div className={classNames('Account', className)}>
      <div className="Account__title Gilroy">
        <img
          className="Account__title__logo"
          src={process.env.PUBLIC_URL + '/images/logo3.png'}
        />
        <div>
          {loginType === 'Login' ? 'Welcome!' : 'Register :)'}
        </div>
      </div>

      <form
        className="Account__inputs"
        onSubmit={onClickAuthentication}
      >
        <input
          className="Account__inputs__email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {renderName()}

        <input
          className="Account__inputs__password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!!error && (
          <div className="Account__error">
            {error}
          </div>
        )}

        {!isLoginLoading ? (
          <input
            className="Account__button Gilroy"
            type="submit"
            value={loginType}
          />
        ) : (
          <Loading className="Account__loading" />
        )}

        <div
          className="Account__bottom Gilroy"
          onClick={() => onClickSwitchTab(loginType === 'Login' ? 'Register' : 'Login')}
        >
          <span className="Account__bottom__switch">
            Switch to
          </span>
          {' '}
          <span className="Account__bottom__type">
            {loginType === 'Login' ? 'Register' : 'Login'}
          </span>
        </div>
      </form>
    </div>
  );

  function onClickSwitchTab(type: string) {
    onClickLoginType(type);
    setEmail('');
    setName('');
    setPassword('');
    onClickResetError();
  }

  function onClickAuthentication(e: React.SyntheticEvent) {
    e.preventDefault();
    onClickLoginLoading();

    if (loginType === 'Login') {
      login(email, password);
      return;
    }

    register(email, password, name);
  }

  function renderName() {
    if (loginType === 'Register') {
      return (
        <input
          className="Account__inputs__name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      );
    }
  }
};

export default Account;
