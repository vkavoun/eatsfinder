import { useEffect, useRef } from 'react';
import { ActionTypes } from '../redux/store';

const useScrollPrefetch = (callback, position, feedContainer) => {
  const savedCallback = useRef();
  const savedPosition = useRef();
  let { currentPosition, count } = position;

  useEffect(() => {
    savedCallback.current = callback;
    savedPosition.current = currentPosition;
  }, [callback, currentPosition]);

  useEffect(() => {
    const handler = (actionType, position) => savedCallback.current(actionType, position);

    if (position && feedContainer && feedContainer.current) {
      const domCurrentPosition = Math.ceil(
        feedContainer.current.scrollHeight -
          feedContainer.current.scrollTop / feedContainer.current.firstElementChild.scrollHeight
      );

      if (domCurrentPosition + 5 > count) {
        handler(ActionTypes.LOAD_MORE, domCurrentPosition);
      } else if (savedPosition.current < domCurrentPosition) {
        handler(ActionTypes.SCROLL_UP, domCurrentPosition);
      }
    }
  }, [currentPosition]);
};

export default useScrollPrefetch;
