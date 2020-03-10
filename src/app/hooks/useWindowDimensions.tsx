import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export default () => {
  const initialWindowDimensions = getWindowDimensions();
  const [windowDimensions, setWindowDimensions] = useState(initialWindowDimensions);

  useEffect(() => {
    function handleResize() {
      const windowDimensions = getWindowDimensions();
      setWindowDimensions(windowDimensions);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
