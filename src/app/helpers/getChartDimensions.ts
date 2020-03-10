import { DIMENSIONS } from '../constants';

type Params = {
  windowHeight: number;
  windowWidth: number;
};

export default ({ windowHeight, windowWidth }: Params) => {
  const dimensions = {
    height: 0,
    width: windowWidth / 1.03,
  };

  if (windowWidth <= DIMENSIONS.MOBILE.MAX_WIDTH) {
    dimensions.height = windowHeight / 1.9;
  } else {
    dimensions.height = windowHeight / 1.65;
  }

  return dimensions;
};
