import './Footer.scss';

import React from 'react';
import classNames from 'classnames';
import Logo from './Logo';
import SvgIcon from './SvgIcon';

type Props = {
  className?: string;
};

const Footer: React.FC<Props> = ({ className }) => {
  const [isClose, setIsClose] = React.useState(true);

  return (
    <div className={classNames('Footer', className, {
      'Footer--close': isClose,
    })}>
      <div className="Footer__first">
        <img
          className="Footer__first__image"
          src={process.env.PUBLIC_URL + '/images/logo3.png'}
        />
        <Logo />
      </div>

      <div className="Footer__second">
        <div className="Footer__second__description">
          Scholar Tracker is made by Yoonkeun Koh.
        </div>

        <div className="Footer__second__contact hidden-in-desktop">
          Contact: yk1803@nyu.edu
        </div>

        <div className="Footer__second__copyright">
          <img
            className="Footer__second__logo"
            src={process.env.PUBLIC_URL + '/images/copyright.png'}
          />
          <div className="Gilroy">Scholar Tracker</div>
        </div>
      </div>

      <div className="Footer__third hidden-in-mobile">
        yk1803@nyu.edu
      </div>

      <SvgIcon
        className="Footer__icon"
        color="gray"
        icon={isClose ? 'angle-up' : 'angle-down'}
        onClick={() => setIsClose(!isClose)}
      />
    </div>
  );
};

export default Footer;
