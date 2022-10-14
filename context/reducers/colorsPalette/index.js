import {
  generateListData,
  convertFromHex,
  convertToHex,
  generateMedianRGB,
  generateColorName,
  validateGeneratedColor,
} from "../../../utils";
import { baseTailwindColors } from "../../../data/tailwindColors";

const colorsPalette = (state, action) => {
  const { type, data } = action;
  const defaultColors = baseTailwindColors();
  const {
    currentSelectionColors,
    previousListType,
    listType,
    generatedObject,
  } = state;

  const { colorsPalette } = state || [];
  const { colorPrefix, generatedShade, primaryShade, secondaryShade } =
    data || "";

  const { addedToPalette, duplicateColor } = state || false;

  console.log("PAL", colorsPalette);
  // Set state of previous list
  previousListType = listType || "";
  switch (type) {
    case "addToPalette":
      if (colorsPalette.length === 0) {
        return {
          ...state,
          listType,
          previousListType,
          generatedObject: {
            primaryShade: { value: "", hex: "", rgb: "" },
            secondaryShade: { value: "", hex: "", rgb: "" },
            generatedShade: {
              name: "",
              value: "",
              hex: "",
              rgb: "",
            },
          },
          colorsPalette: [
            {
              colorPrefix,
              shades: [generatedShade],
            },
          ],
        };
      } else {
        const filteredIndex = colorsPalette.findIndex(
          (color) => color.colorPrefix === colorPrefix
        );

        // const update = [
        //   ...colorsPalette[filteredIndex].shades,
        //   { ...generatedShade },
        // ];
        console.log("FILTTTT", filteredIndex);
        // const filteredColor = colorsPalette.map((paletteColor, index) => {
        //   if (paletteColor.colorPrefix === colorPrefix)
        //     return [
        //       ...paletteColor.shades,
        //       { ...generatedObject.generatedShade },
        //     ];
        // });
        if (filteredIndex === -1) {
          console.log("NOT FILT");
          return {
            ...state,
            listType,
            previousListType,
            generatedObject: {
              primaryShade: { value: "", hex: "", rgb: "" },
              secondaryShade: { value: "", hex: "", rgb: "" },
              generatedShade: {
                prefix: "",
                name: "",
                value: "",
                hex: "",
                rgb: "",
              },
            },

            colorsPalette: [
              ...colorsPalette,
              { colorPrefix, shades: [generatedShade] },
            ],
          };
        } else {
          colorsPalette[filteredIndex].shades = [
            ...colorsPalette[filteredIndex].shades,
            {
              ...generatedShade,
            },
          ];
          return {
            ...state,
            listType,
            previousListType,
            generatedObject: {
              primaryShade: { value: "", hex: "", rgb: "" },
              secondaryShade: { value: "", hex: "", rgb: "" },
              generatedShade: { name: "", value: "", hex: "", rgb: "" },
            },
            colorsPalette,
          };
        }

        // } else {
        //   return {
        //     ...state,
        //     listType,
        //     previousListType,
        //     generatedObject: {
        //       primaryShade: { value: "", hex: "", rgb: "" },
        //       secondaryShade: { value: "", hex: "", rgb: "" },
        //       generatedShade: { name: "", value: "", hex: "", rgb: "" },
        //     },
        //     colorsPalette: [
        //       ...colorsPalette,
        //       { colorPrefix, shades: [generatedShade] },
        //     ],
        //   };
        // }
        // );
      }
    default:
      return state;
  }

  console.log(
    "filt",
    newShades,
    "\nshade",
    generatedShade,
    "\nPAL",
    colorsPalette
  );
};

export default colorsPalette;
