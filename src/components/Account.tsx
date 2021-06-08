import * as React from 'react';
import classNames from 'classnames';

import './Account.scss';

type Props = {
  className?: string;
  loginType: string;
  onClickLoginType: (type: string) => void;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  error: string;
  onClickResetError: () => void;
};

const Account: React.FC<Props> = ({ className, loginType, onClickLoginType, login, register, error, onClickResetError }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  return (
    <div className={classNames('Account', className)}>
      <div className="Account__tab">
        <div
          className={classNames('Account__tab__login', {
            'Account__tab__login--selected': loginType === 'Login'
          })}
          onClick={() => onClickSwitchTab('Login')}
        >
          Login
        </div>
        <div
          className={classNames('Account__tab__register', {
            'Account__tab__register--selected': loginType === 'Register',
          })}
          onClick={() => onClickSwitchTab('Register')}
        >
          Register
        </div>
      </div>

      <div className="Account__title">{loginType}</div>

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

        <input
          className="Account__button"
          type="submit"
          value={loginType}
        />
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      );
    }
  }
};

export default Account;
