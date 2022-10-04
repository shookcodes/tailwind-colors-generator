import {
  generateListData,
  convertFromHex,
  convertToHex,
  generateMedianRGB,
  generateColorName,
  validateGeneratedColor,
} from "../../../utils";
import { baseTailwindColors } from "../../../data/tailwindColors";

const colors = (state, action) => {
  const { type, data } = action;
  const defaultColors = baseTailwindColors();
  const {
    currentColors,
    previousListType,
    listType,
    colorsPalette,
    generatedObject,
    // generatedObject: {
    //   colorPrefix,
    //   primaryShade,
    //   secondaryShade,
    //   generatedShade,
    // },
  } = state;

  const { colorObject } = data || "";

  console.log("stateeee", state);
  // Set state of previous list
  previousListType = listType || "";
  switch (type) {
    case "default":
      currentColors = defaultColors;
      listType = "primary";
      return { ...state, currentColors, listType };

    case "update":
      listType = "secondary";

      currentColors = [generateListData({ ...colorObject })];

      return { ...state, previousListType, listType, currentColors };

    case "addPrimaryShade":
      previousListType = listType;
      console.log("data", data);
      const colorPrefix = colorObject.colorPrefix;
      const primaryShade = { ...colorObject.shade };
      const primaryRGB = convertFromHex(primaryShade.hex);

      return {
        ...state,
        previousListType,
        generatedObject: {
          colorPrefix,
          primaryShade: { rgb: primaryRGB, ...primaryShade },
        },
      };

    case "addSecondaryShade":
      previousListType = listType;

      const secondaryShade = colorObject.shade;
      console.log("sec", secondaryShade);
      const secondaryRGB = convertFromHex(secondaryShade.hex);
      console.log(
        "sec2",
        generatedObject.colorPrefix,
        generatedObject.primaryShade.value,
        secondaryShade.value
      );

      secondaryShade = { ...secondaryShade, rgb: secondaryRGB };
      console.log(
        "sec2",
        generatedObject.colorPrefix,
        generatedObject.primaryShade.value,
        secondaryShade.value
      );

      console.log(
        "sec2",
        generatedObject.colorPrefix,
        generatedObject.primaryShade.value,

        generatedObject.primaryShade.rgb,
        secondaryShade.rgb
      );
      // generate blended color
      const generatedRGB = generateMedianRGB(
        generatedObject.primaryShade.rgb,
        secondaryShade.rgb
      );
      const generatedHex = convertToHex(generatedRGB);

      const generatedName = generateColorName(
        generatedObject.colorPrefix,
        generatedObject.primaryShade.value,
        secondaryShade.value
      );

      // generatedObject = { ...generatedObject, ...secondaryShade, generatedShade: {hex} };
      console.log("NAME", generatedName);

      // validate generated name
      // validateGeneratedColor(
      //   colorsPalette,
      //   generatedName,
      //   generatedHex,
      //   (generatedName, duplicatePrefix, duplicateColor) => {
      //     console.log("CB", generatedName, duplicatePrefix, duplicateColor);
      //     if (!duplicateColor) {

      //     }
      //   }
      // );
      return {
        ...state,
        previousListType,
        generatedObject,
      };

    default:
      return state;
  }
};

export default colors;
