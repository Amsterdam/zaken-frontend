import { useEffect, useState } from 'react';

const useMediaQuery = (selectedMinWidth?: number) => {
  const [state, setState] = useState({
    windowWidth: window.innerWidth,
    isDesiredWidth: false,
  });

  const minWidth = selectedMinWidth || 0;

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window.innerWidth;
      const isDesiredWidth = currentWindowWidth > minWidth;
      setState({ windowWidth: currentWindowWidth, isDesiredWidth });
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [minWidth]);

  return { isDesiredWidth: state.isDesiredWidth, windowWidth: state.windowWidth };
};

export default useMediaQuery;
