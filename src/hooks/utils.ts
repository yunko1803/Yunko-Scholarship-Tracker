import React from 'react';
import { Nullable } from '../models';
import { isBrowser } from '../utils/misc';

export type StateActionWithPartial<T> = Partial<T> | ((prevState: T) => T);
export type StateWithPartialSetter<T> = [T, React.Dispatch<StateActionWithPartial<T>>];
type StateDispatcher<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * hooks to set nested state with ease
 *
 * @remarks
 * const [state, setState] = useStateWithPartialSetter({ a: 0, b: 0 });
 *
 * console.log(state); // { a: 0, b: 0 }
 *
 * setState({ b: 1 });
 *
 * console.log(state); // { a: 0, b: 1 }
 *
 * @param defaultValue
 */
export function useStateWithPartialSetter<T extends object>(defaultValue: T): StateWithPartialSetter<T> {
  const [state, _setState] = React.useState<T>(defaultValue);

  return [state, createPartialSetState(_setState)];
}

export function createPartialSetState<T>(setState: StateDispatcher<T>) {
  return (data: StateActionWithPartial<T>) => {
    if (typeof data === 'function') {
      setState(data);
      return;
    }

    setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
}
