export const colorFromFrequency = (val) => {
  if (val > 100) {
    return [255, 0, 0];
  } else if (val > 50) {
    return [255, 165, 0];
  } else if (val > 25) {
    return [150, 75, 0];
  } else if (val > 12) {
    return [255, 255, 0];
  } else if (val > 6) {
    return [0, 255, 0];
  } else if (val > 3) {
    return [128, 0, 128];
  } else if (val > 2) {
    return [255, 0, 0];
  } else if (val > 1) {
    return [120, 120, 120];
  } else {
    return [155, 255, 155];
  }
};
