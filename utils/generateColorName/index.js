import { checkDuplicates } from "../checkDuplicates";
export const generateColorName = ({
  colorPrefix,
  primaryColorValue,
  secondaryColorValue,
  data,
}) => {
  let averageValue =
    (parseInt(primaryColorValue) + parseInt(secondaryColorValue)) / 2;

  if (checkDuplicates(data, colorPrefix, averageValue)) {
    averageValue += 1;
    checkDuplicates(data, colorPrefix, averageValue);
  }

  return colorPrefix + "-" + averageValue;
};
