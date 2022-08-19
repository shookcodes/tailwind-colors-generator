import { checkColorHexDuplicates } from "../checkDuplicates";
import { checkColorNameDuplicates } from "../checkDuplicates";

// This validation checks for duplicate color prefixes and values on both the default Tailwind colors and the generated colors palette. It returns an updated color name, if applicable, or returns "duplicate found" if an exact name and hex match is found in the generated array.
export const validateGeneratedColor = (
  defaultColors,
  filteredColors,
  currentName,
  rgb,
  callback,
  duplicatePrefix = false,
  error = false

  // duplicateValue = false
) => {
  //   let error = false;
  // If a duplicate is found in the default array, increase the value of the currentName by one.
  const increaseColorValue = () => {
    return (currentName =
      currentName.split("-")[0] +
      "-" +
      (parseInt(currentName.split("-")[1]) + 1));
  };
  // defaultDuplicates  checks for duplicates of the default Tailwind colors. Returns false if no duplicates are found, otherwise return checkColorNameDuplicates's value
  const defaultDuplicates = () => {
    return checkColorNameDuplicates(defaultColors, currentName)
      ? checkColorNameDuplicates(defaultColors, currentName)
      : false;
  };

  // paletteDuplicates  checks for duplicates of the filteredColors array. Returns false if no duplicates are found, otherwise return checkColorNameDuplicates's value
  const paletteDuplicates = () => {
    return checkColorNameDuplicates(filteredColors, currentName)
      ? checkColorNameDuplicates(filteredColors, currentName)
      : false;
  };

  if (defaultDuplicates().duplicateValue) {
    increaseColorValue(currentName);
  }
  // If the filtered palette is empty or if there are no other colors on the palette starting with the same color prefix, return the validated name.
  if (filteredColors.length === 0 || !paletteDuplicates().duplicatePrefix) {
    callback(currentName, duplicatePrefix, error);
    return currentName;
  }

  // If the color's prefix is found on the filtered palette, check if a match is found with the same name and/or hex, and handle as applicable
  if (paletteDuplicates().duplicatePrefix) {
    duplicatePrefix = true;

    if (
      currentName ===
      `${paletteDuplicates().duplicatePrefix}-${
        paletteDuplicates().duplicateValue
      }`
    ) {
      const duplicateNameAndHex = checkColorHexDuplicates(
        filteredColors,
        currentName.split("-")[0],
        rgb
      );
      // If the current color has the same colorPrefix, value, and hex properties, set error callback value to true but don't update the value of the currentName.
      if (duplicateNameAndHex) {
        error = true;
      }
      // If the current name is the same but the hexes are different, increase the value of the currentName.
      if (!duplicateNameAndHex) {
        increaseColorValue(currentName);
      }
    }
    callback(currentName, duplicatePrefix, error);
    return currentName;
  }
};
