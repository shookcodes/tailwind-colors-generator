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
      const secondaryRGB = convertFromHex(secondaryShade.hex);

      secondaryShade = { ...secondaryShade, rgb: secondaryRGB };

      const initialGeneratedName = generateColorName(
        generatedObject.colorPrefix,
        generatedObject.primaryShade.value,
        secondaryShade.value
      );

      const generatedRGB = generateMedianRGB(
        generatedObject.primaryShade.rgb,
        secondaryShade.rgb
      );
      // generate blended color
      const generatedShade = {
        rgb: generatedRGB,
        hex: convertToHex(generatedRGB),
      };

      // validate generated name
      const { generatedName, duplicateColor } =
        validateGeneratedColor(
          colorsPalette,
          initialGeneratedName,
          generatedShade.hex
        ) || "";
      generatedObject = {
        secondaryShade,
        generatedShade: { ...generatedShade, name: generatedName },
        duplicateColor,
      };
      return {
        ...state,
        previousListType,
        ...generatedObject,
      };

    default:
      return state;
  }
};

export default colors;
