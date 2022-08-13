export const generateColorName = ({
  colorPrefix,
  primaryColorValue,
  secondaryColorValue,
  data,
}) => {
  let averageValue =
    (parseInt(primaryColorValue) + parseInt(secondaryColorValue)) / 2;

  const checkDuplicates = (data) => {
    const filteredColorPrefix = data.filter(
      (color) => color.colorPrefix === colorPrefix
    );

    const shades = filteredColorPrefix.pop().shades;

    const filteredShade = shades
      .filter((shade) => parseInt(shade.value) === averageValue)
      .pop();

    if (filteredShade) {
      averageValue += 1;
      return filteredShade;
    }

    return colorPrefix + "-" + averageValue;
  };
  checkDuplicates(data);

  return colorPrefix + "-" + averageValue;
};
