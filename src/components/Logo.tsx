import './Logo.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('Logo Gilory', className)}>
      <span className="Logo__scholar">Scholar</span>
      {' '}
      <span className="Logo__tracker">Tracker</span>
    </div>
  );
};

export default Logo;
