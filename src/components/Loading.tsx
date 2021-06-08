import './Loading.scss';

import React from 'react';
import Spinner from 'react-spinner-material';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const Loading: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('Loading', className)}>
      <Spinner radius={40} color={"#333"} stroke={2} visible={true} />
    </div>
  );
};

export default Loading;
