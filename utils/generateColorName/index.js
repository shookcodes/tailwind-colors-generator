export const generateColorName = ({
  colorPrefix,
  primaryColorValue,
  secondaryColorValue,
}) => {
  let averageValue =
    (parseInt(primaryColorValue) + parseInt(secondaryColorValue)) / 2;

  return colorPrefix + "-" + averageValue;
};
