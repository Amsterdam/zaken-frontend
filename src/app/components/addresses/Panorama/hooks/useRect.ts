// LINK: https://codesandbox.io/s/userect-hook-1y5t7?file=/src/useRect.tsx:0-1521
import { useLayoutEffect, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

type RectResult = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
};

const getRect = <T extends HTMLElement>(element?: T): RectResult => {
  let rect: RectResult = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  };
  if (element) rect = element.getBoundingClientRect();
  return rect;
};

export default <T extends HTMLElement>(
  ref: React.RefObject<T>,
  delay = 0,
): RectResult => {
  const [rect, setRect] = useState<RectResult>(
    ref?.current ? getRect(ref.current) : getRect(),
  );

  const handleResize = useCallback(() => {
    if (ref.current == null) return;
    setRect(getRect(ref.current)); // Update client rect
  }, [ref]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (element == null) return;

    handleResize();

    const debounced = debounce(handleResize, delay);

    if (typeof ResizeObserver === 'function') {
      const resizeObserver = new ResizeObserver(debounced);
      resizeObserver.observe(element);
      return () => {
        resizeObserver.disconnect();
      };
    }
    window.addEventListener('resize', debounced); // Browser support, remove freely
    return () => window.removeEventListener('resize', debounced);
  }, [ref, delay, handleResize]);

  return rect;
};
