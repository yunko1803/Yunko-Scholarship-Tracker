import './Tab.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  content: string;
  onSelect: (group: string) => void;
};

const Tab: React.FC<Props> = ({ className, content, onSelect }) => {
  return (
    <div
      className={classNames('Tab', className)}
      onClick={() => onSelect(content)}
    >
      {content}
    </div>
  );
};

export default Tab;
