import React from 'react';

export function useEventListener(target: HTMLElement | Window | Document | null, eventName: string, eventHandler: (event: any) => void, options?: EventListenerOptions) {
  React.useEffect(() => {
    if (!target) return;

    target.addEventListener(eventName, eventHandler, options);

    return () => {
      target.removeEventListener(eventName, eventHandler, options);
    };
  }, [target, eventName, eventHandler, options]);
}
