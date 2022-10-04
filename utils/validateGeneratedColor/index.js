import { tailwindColors } from "../../data/tailwindColors";
import { checkColorHexDuplicates } from "../checkDuplicates";
import { checkColorNameDuplicates } from "../checkDuplicates";

// This validation checks for duplicate color prefixes and values on both the default Tailwind colors and the generated colors palette. It returns an updated color name, if applicable, or returns "duplicate found" if an exact name and hex match is found in the generated array.
export const validateGeneratedColor = (
  filteredColors,
  generatedName,
  rgb
  // callback,
  // duplicatePrefix = false,
  // duplicateColor = false
) => {
  let duplicatePrefix = false;
  let duplicateColor = false;

  // If a duplicate is found in the default array, increase the value of the generatedName by one.
  const increaseColorValue = () => {
    return (generatedName =
      generatedName.split("-")[0] +
      "-" +
      (parseInt(generatedName.split("-")[1]) + 1));
  };
  // defaultDuplicates  checks for duplicates of the default Tailwind colors. Returns false if no duplicates are found, otherwise return checkColorNameDuplicates's value
  const defaultDuplicates = () => {
    return checkColorNameDuplicates(tailwindColors(), generatedName)
      ? checkColorNameDuplicates(tailwindColors(), generatedName)
      : false;
  };

  // paletteDuplicates checks for duplicates of the filteredColors array. Returns false if no duplicates are found, otherwise return checkColorNameDuplicates's value
  const paletteDuplicates = () => {
    return checkColorNameDuplicates(filteredColors, generatedName)
      ? checkColorNameDuplicates(filteredColors, generatedName)
      : false;
  };

  if (defaultDuplicates().duplicateValue) {
    increaseColorValue(generatedName);
  }
  // If the filtered palette is empty or if there are no other colors on the palette starting with the same color prefix, return the validated name.
  if (filteredColors.length === 0 || !paletteDuplicates().duplicatePrefix) {
    return { generatedName, duplicatePrefix, duplicateColor };
  }

  // If the color's prefix is found on the filtered palette, check if a match is found with the same name and/or hex, and handle as applicable
  if (paletteDuplicates().duplicatePrefix) {
    duplicatePrefix = true;

    if (
      generatedName ===
      `${paletteDuplicates().duplicatePrefix}-${
        paletteDuplicates().duplicateValue
      }`
    ) {
      let prefix;
      let shade;
      const duplicateNameAndHex = checkColorHexDuplicates(
        filteredColors,
        generatedName.split("-")[0],
        rgb
      );

      // If the current color has the same colorPrefix, value, and hex properties, set duplicateColor value to true but don't update the value of the generatedName.
      if (duplicateNameAndHex) {
        duplicateColor = filteredColors.map((color) => {
          if (color.colorPrefix === duplicateNameAndHex.colorPrefix) {
            prefix = color.colorPrefix;
            shade = color.shades
              .filter((shade) => {
                return shade.hex === duplicateNameAndHex.filteredShades[0].hex;
              })
              .pop();
          }

          return { generatedName, duplicateColor: { prefix, shade } };
        });
      }

      // If the current name is the same but the hexes are different, increase the value of the generatedName.
      if (!duplicateColor) {
        increaseColorValue(generatedName);
      } else {
        generatedName =
          generatedName.split("-")[0] + "-" + parseInt(shade.value);
      }
      return { generatedName, duplicateColor };
    }
  }
};
