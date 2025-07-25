import { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';

function Loader() {
  const [primaryColor, setPrimaryColor] = useState('#000000');

  useEffect(() => {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();
    setPrimaryColor(color || '#ecbb88');
  }, []);

  return <RingLoader color={primaryColor} size={75} />;
}

export default Loader;
