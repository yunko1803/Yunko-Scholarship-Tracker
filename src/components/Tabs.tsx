import './Tabs.scss';

import React from 'react';
import classNames from 'classnames';
import Tab from './Tab';

type Props = {
  className?: string;
  contents: string[];
  onSelect: (group: string) => void;
};

const Tabs: React.FC<Props> = ({ className, contents, onSelect }) => {

  return (
    <div className={classNames('Tabs', className)}>
      {contents.map((content) => {
        return (
          <Tab
            key={content}
            className="Tabs__Tab"
            content={content}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
};

export default Tabs;
