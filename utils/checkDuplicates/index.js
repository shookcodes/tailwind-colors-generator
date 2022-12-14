const checkColorNameDuplicates = (data, colorName, callback) => {
  const colorPrefix = colorName.split("-")[0];
  const colorValue = parseInt(colorName.split("-")[1]);

  const filteredColorPrefix = data.filter((color) => {
    return color.colorPrefix === colorPrefix;
  });

  // If the colorPrefix is found in the data, return true
  const duplicatePrefix =
    filteredColorPrefix.length === 0 ? false : colorPrefix;

  if (!duplicatePrefix || duplicatePrefix.length === 0) {
    duplicatePrefix = false;
    return { duplicatePrefix, duplicateValue };
  }
  let duplicateValue;

  const shades = filteredColorPrefix?.pop().shades;

  const filteredShade = shades
    .filter((shade) => parseInt(shade?.value) === colorValue)
    .pop();

  if (filteredShade) {
    duplicateValue = colorValue;
  } else {
    duplicateValue = false;
  }

  return { duplicatePrefix, duplicateValue, callback };
};

const checkColorHexDuplicates = (data, colorPrefix, hex) => {
  const filteredColors = data.filter((color) => {
    return color.colorPrefix === colorPrefix;
  });
  if (filteredColors.length === 0) {
    return;
  }

  const filteredShades = filteredColors[0]?.shades?.filter(
    (shade) => shade.hex === hex
  );

  return filteredShades.length > 0 ? { colorPrefix, filteredShades } : false;
};

export { checkColorNameDuplicates, checkColorHexDuplicates };
