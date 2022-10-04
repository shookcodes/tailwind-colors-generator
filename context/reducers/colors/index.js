import {
  generateListData,
  convertFromHex,
  convertToHex,
  generateMedianRGB,
  generateColorName,
} from "../../../utils";
import { baseTailwindColors } from "../../../data/tailwindColors";

const colors = (state, action) => {
  const { type, data } = action;
  const defaultColors = baseTailwindColors();
  const { currentColors, previousListType, listType, generatedObject } = state;
  const { primaryShade, secondaryShade, generatedShade } = generatedObject;
  const { colorObject } = data || "";

  const { rgb, hex, value } = generatedShade;
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
      generatedObject.colorPrefix = colorObject.colorPrefix;
      generatedObject.primaryShade = colorObject.shade;
      generatedObject.primaryShade.rgb = convertFromHex(
        generatedObject.primaryShade.hex
      );
      return { ...state, previousListType, generatedObject };

    case "addSecondaryShade":
      previousListType = listType;
      generatedObject.secondaryShade = data.colorObject.shade;

      secondaryShade.rgb = convertFromHex(secondaryShade.hex);

      // generate blended color
      rgb = generateMedianRGB(primaryShade.rgb, secondaryShade.rgb);
      hex = convertToHex(rgb);
      return { ...state, previousListType, rgb, hex };

    default:
      return state;
  }
};

export default colors;
