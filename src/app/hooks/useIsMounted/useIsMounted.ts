import { useRef, useEffect } from 'react';

/**
 * Returns a RefObject, the current value is true when the component is still mounted
 */
const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);
  return isMounted;
};

export default useIsMounted;
