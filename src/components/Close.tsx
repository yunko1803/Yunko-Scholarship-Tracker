import './Close.scss';

import * as React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  theme?: 'dark';
  size?: 'small' | 'tiny';
  onClick?: (evt: React.MouseEvent) => void;
};

const Close = ({ className, theme, size, onClick }: Props) => (
  <div
    className={classNames('Close', theme, size, className, {
      clickable: !!onClick,
    })}
    onClick={onClick}
  />
);

export default Close;
