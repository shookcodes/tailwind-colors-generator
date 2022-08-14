export const checkDuplicates = (data, colorPrefix, colorValue) => {
  const filteredColorPrefix = data.filter(
    (color) => color.colorPrefix === colorPrefix
  );

  const shades = filteredColorPrefix?.pop().shades;

  const filteredShade = shades
    .filter((shade) => parseInt(shade.value) === colorValue)
    .pop();

  if (filteredShade) {
    // averageValue += 1;
    return true;
  }
};
