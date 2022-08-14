import { checkColorNameDuplicates } from "../checkDuplicates";
export const generateColorName = ({
  colorPrefix,
  primaryColorValue,
  secondaryColorValue,
  data,
}) => {
  let averageValue =
    (parseInt(primaryColorValue) + parseInt(secondaryColorValue)) / 2;

  if (
    checkColorNameDuplicates(data, colorPrefix, averageValue).duplicateValue
  ) {
    averageValue++;
    checkColorNameDuplicates(data, colorPrefix, averageValue);
  }

  return colorPrefix + "-" + averageValue;
};
