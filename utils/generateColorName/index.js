import { checkColorNameDuplicates } from "../checkDuplicates";
export const generateColorName = ({
  colorPrefix,
  primaryColorValue,
  secondaryColorValue,
  data,
  secondaryData,
}) => {
  let averageValue =
    (parseInt(primaryColorValue) + parseInt(secondaryColorValue)) / 2;

  if (
    checkColorNameDuplicates(data, colorPrefix, averageValue).duplicateValue
  ) {
    averageValue++;
    checkColorNameDuplicates(data, colorPrefix, averageValue);
  }
  if (secondaryData && secondaryData.length > 0) {
    if (
      checkColorNameDuplicates(secondaryData, colorPrefix, averageValue)
        .duplicateValue
    ) {
      averageValue++;
      checkColorNameDuplicates(secondaryData, colorPrefix, averageValue);
    }
  }

  return colorPrefix + "-" + averageValue;
};
