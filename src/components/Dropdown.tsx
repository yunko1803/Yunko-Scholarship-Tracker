import './Dropdown.scss';

import React from 'react';
import classNames from 'classnames';
import SvgIcon from './SvgIcon';
import { useEventListener } from '../hooks/dom';
import { isBrowser } from '../utils/misc';
import { ESC } from '../utils/keycodes';
import { Nullable } from '../models/index';

type Props<T> = {
  items: T[];
  defaultValue?: T;
  hideArrow?: boolean;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  renderItem?: (item: T) => React.ReactNode;
  onChange: (item: T) => void;
  onClick?: () => void;
};

// eslint-disable-next-line
const Dropdown = <T extends string | number | object>({
  items,
  defaultValue,
  hideArrow,
  className,
  buttonClassName,
  listClassName,
  itemClassName,
  iconClassName,
  renderItem,
  onChange,
  onClick,
}: Props<T>) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Nullable<T>>(defaultValue ?? null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const doc = isBrowser() ? document : null;

  if (items.length > 0 && typeof items[0] === 'object' && !renderItem) {
    throw new Error('If the item is an object type, use it with "onRender" props.');
  }

  useEventListener(doc, 'keyup', (e) => {
    if (e.keyCode !== ESC) return;

    setOpen(false);
  });

  useEventListener(doc, 'click', (e) => {
    if (divRef.current?.contains(e.target as any)) return;
    if (!open) return;

    setOpen(false);
  });

  useEventListener(doc, 'scroll', () => setOpen(false));

  return (
    <div
      className={classNames('Dropdown', className)}
      ref={divRef}
    >
      <div
        className={classNames('Dropdown__button', buttonClassName)}
        onClick={handleToggleOpen}
      >
        {selected
          ? (renderItem ? renderItem(selected) : selected)
          : 'Select Group'}
      </div>
      <ul
        className={classNames('Dropdown__list', listClassName, {
          'Dropdown__list--open': open,
        })}
      >
        {items.map((item, index) => (
          <li
            key={`dropdown-list-item-${index}`}
            onClick={handleClickItem(item)}
            className={classNames('Dropdown__list__item', itemClassName, {
              'Dropdown__list__item--selected': selected === item,
            })}
          >
            {renderItem ? renderItem(item) : item}
          </li>
        ))}
      </ul>
      {!hideArrow && (
        <SvgIcon
          icon="arrow-down"
          className="Dropdown__icon"
        />
      )}
    </div>
  );

  function handleToggleOpen(evt: React.MouseEvent) {
    evt.stopPropagation();

    setOpen(state => !state);

    if (typeof onClick !== 'function') return;
    onClick();
  }

  function handleClickItem(item: T) {
    return (evt: React.MouseEvent) => {
      handleToggleOpen(evt);

      if (item === selected) return;

      setSelected(item);
      onChange(item);
    };
  }
};

export default Dropdown;
