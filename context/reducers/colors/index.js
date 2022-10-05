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

  const colorObject = data || "";

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

    case "createPrimaryShade":
      previousListType = listType;
      const colorPrefix = colorObject.colorPrefix;
      const primaryShade = { ...colorObject.shade };
      const primaryRGB = convertFromHex(primaryShade.hex);

      return {
        ...state,
        previousListType,
        generatedObject: {
          ...generatedObject,
          colorPrefix,
          primaryShade: { rgb: primaryRGB, ...primaryShade },
        },
      };
    case "deletePrimaryShade":
      previousListType = listType;

      // Remove primary and generated shade
      generatedObject.primaryShade = "";
      if (generatedObject?.generatedShade) {
        generatedObject.generatedShade = "";
      }

      return {
        ...state,
        previousListType,
        generatedObject,
      };

    case "createSecondaryShade":
      previousListType = listType;

      const secondaryShade = colorObject.shade;
      const secondaryRGB = convertFromHex(secondaryShade.hex);

      secondaryShade = { ...secondaryShade, rgb: secondaryRGB };

      return {
        ...state,
        previousListType,
        generatedObject: { ...generatedObject, secondaryShade },
      };

    case "deleteSecondaryShade":
      previousListType = listType;

      // Remove primary and generated shade
      generatedObject.secondaryShade = "";
      if (generatedObject?.generatedShade) {
        return (generatedObject.generatedShade = "");
      }

      return {
        ...state,
        previousListType,
        generatedObject: { ...generatedObject, secondaryShade },
      };

    case "createGeneratedShade":
      previousListType = listType;
      const initialGeneratedName = generateColorName(
        generatedObject.colorPrefix,
        generatedObject.primaryShade.value,
        generatedObject.secondaryShade.value
      );

      const generatedRGB = generateMedianRGB(
        generatedObject.primaryShade.rgb,
        generatedObject.secondaryShade.rgb
      );
      // Generate blended color
      const generatedShade = {
        rgb: generatedRGB,
        hex: convertToHex(generatedRGB),
      };

      // Validate generated name
      const { generatedName, duplicateColor } =
        validateGeneratedColor(
          colorsPalette,
          initialGeneratedName,
          generatedShade.hex
        ) || "";
      generatedObject = {
        ...generatedObject,
        ...primaryShade,
        ...secondaryShade,
        generatedShade: { ...generatedShade, name: generatedName },
        duplicateColor,
      };

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
