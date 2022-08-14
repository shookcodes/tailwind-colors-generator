import { useContext } from "react";
import { ColorContext } from "../../context/ColorContext";

export const updateColorsPalette = (colorObject, colorPalette) => {
  if (colorsPalette.length === 0) {
    return colorsPalette.push({
      colorPrefix: colorObject.colorPrefix,
      shades: [{ ...colorObject.shade }],
    });
  }

  colorsPalette.forEach((color) => {
    if (color.colorPrefix === colorObject.colorPrefix) {
      return color.shades.push({ ...colorObject.shade });
    }
  });
};
