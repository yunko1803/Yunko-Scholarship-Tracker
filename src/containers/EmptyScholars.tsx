import './EmptyScholars.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  manager: string;
};

const EmptyScholars: React.FC<Props> = ({ className, manager }) => {

  return (
    <div className={classNames('EmptyScholars', className)}>
      <img
        className="EmptyScholars__emoji"
        src={process.env.PUBLIC_URL + '/images/thinking.png'}
      />
      <div
        className="EmptyScholars__nothing Gilroy"
      >
        Nothing :(
      </div>

      <div
        className="EmptyScholars__description"
      >
        {!manager ? (
          <div>
            Please login to your account.
          </div>
        ) : (
          <>
            <div>
              I don't have anything yet.
            </div>
            <div>
              Add an item by clicking the
              {' '}
              <span className="EmptyScholars__description__add Gilroy">
                +add button
              </span>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default EmptyScholars;
