import { DIMENSIONS } from '../constants';

type Params = {
  windowHeight: number;
  windowWidth: number;
};

export default ({ windowHeight, windowWidth }: Params) => {
  const dimensions = {
    height: windowHeight / 4,
    width: 0,
  };

  if (windowWidth <= DIMENSIONS.MOBILE.MAX_WIDTH) {
    dimensions.width = windowWidth / 1.1; // keep padding
    dimensions.height = windowHeight / 6;
  } else {
    dimensions.width = windowWidth / 2.2;
  }

  return {
    height: dimensions.height.toString(),
    width: dimensions.width.toString(),
  }
};
