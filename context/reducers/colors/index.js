import {
  generateListData,
  convertFromHex,
  convertToHex,
  generateMedianRGB,
  generateColorName,
  validateGeneratedColor,
} from "../../../utils";
import { colorsObject } from "../../../data/colorsObject";
import { baseTailwindColors } from "../../../data/tailwindColors";

const colors = (state, action) => {
  const { type, data } = action;
  const defaultColors = baseTailwindColors();

  // const { ...colorsPalette } = state || [];

  const {
    listType,
    previousListType,
    generatedObject: {
      colorPrefix,
      primaryShade,
      secondaryShade,
      generatedShade,
    },
  } = state;

  const { addedToPalette, duplicateColor } = state || false;

  const { currentSelectionColors, colorsPalette } = state || [];

  const { name, value, hex, rgb } = generatedShade;
  const colorObject = data || "";

  // Set state of previous list
  previousListType = listType || "";
  let primaryRGB, secondaryRGB;
  switch (type) {
    case "showPrimaryGrid":
      currentSelectionColors = defaultColors;
      listType = "primary";
      return { ...state, listType, currentSelectionColors };

    case "showSecondaryGrid":
      listType = "secondary";

      currentSelectionColors = [generateListData({ ...colorObject })];

      return { ...state, previousListType, listType, currentSelectionColors };

    case "createPrimaryShade":
      // previousListType = listType;
      colorPrefix = colorObject.colorPrefix;
      primaryShade = { ...colorObject.shade };
      primaryRGB = convertFromHex(primaryShade.hex);

      return {
        ...state,
        previousListType,
        listType,
        generatedObject: {
          colorPrefix,
          primaryShade: { rgb: primaryRGB, ...primaryShade },
          secondaryShade,
          generatedShade,
          duplicateColor,
          addedToPalette,
        },
      };
    case "deletePrimaryShade":
      // previousListType = listType;

      // Remove primary and generated shade
      primaryShade = "";
      if (generatedShade !== undefined) {
        generatedShade = "";
      }

      return {
        ...state,
        previousListType,
        listType,
        generatedObject: {
          colorPrefix,
          primaryShade,
          secondaryShade: { rgb: secondaryRGB || "", ...secondaryShade },
          generatedShade,
          duplicateColor,
          addedToPalette,
        },
      };

    case "createSecondaryShade":
      // previousListType = listType;
      listType = "secondary";
      secondaryShade = colorObject.shade;
      secondaryRGB = convertFromHex(secondaryShade.hex);

      secondaryShade = { ...secondaryShade, rgb: secondaryRGB };

      return {
        ...state,
        previousListType,
        listType,
        generatedObject: {
          colorPrefix,
          primaryShade,
          secondaryShade: { rgb: secondaryRGB, ...secondaryShade },
          generatedShade,
          duplicateColor,
          addedToPalette,
        },
      };

    case "deleteSecondaryShade":
      // previousListType = listType;

      // Remove primary and generated shade
      secondaryShade = "";
      if (generatedShade !== undefined) {
        return (generatedShade = "");
      }

      return {
        ...state,
        previousListType,
        listType,
        generatedObject: {
          colorPrefix,
          primaryShade,
          secondaryShade,
          generatedShade,
          duplicateColor,
          addedToPalette,
        },
      };

    case "createGeneratedShade":
      // previousListType = listType;
      const initialGeneratedName = generateColorName(
        colorPrefix,
        primaryShade.value,
        secondaryShade.value
      );

      rgb = generateMedianRGB(primaryShade.rgb, secondaryShade.rgb);

      hex = convertToHex(rgb);

      // Validate generated name
      const { generatedName, duplicateColor } =
        validateGeneratedColor(colorsPalette, initialGeneratedName, hex) || "";

      // Generate blended color
      // rgb = generatedRGB;
      // hex = convertToHex(generatedRGB);
      // name = generatedName;
      // value = generatedName.split("-")[1];
      return {
        ...state,
        previousListType,
        listType,
        generatedObject: {
          colorPrefix,
          primaryShade,
          secondaryShade,
          generatedShade: {
            name: generatedName,
            value: generatedName.split("-")[1],
            hex,
            rgb,
          },
          duplicateColor,
          addedToPalette: true,
        },
      };

    default:
      return state;
  }
};

export default colors;
