const checkColorNameDuplicates = (data, colorPrefix, colorValue) => {
  const filteredColorPrefix = data.filter((color) => {
    return color.colorPrefix === colorPrefix;
  });

  const duplicatePrefix = filteredColorPrefix.length === 0 ? false : true;

  if (!duplicatePrefix || duplicatePrefix.length === 0) {
    duplicatePrefix = false;
    return { duplicatePrefix, duplicateValue };
  }
  let duplicateValue;

  const shades = filteredColorPrefix?.pop().shades;

  const filteredShade = shades
    .filter((shade) => parseInt(shade.value) === colorValue)
    .pop();

  if (filteredShade) {
    duplicateValue = true;
  } else {
    duplicateValue = false;
  }

  return { duplicatePrefix, duplicateValue };
};

const checkColorHexDuplicates = (data, colorPrefix, hex) => {
  const filteredColors = data.filter((color) => {
    return color.colorPrefix === colorPrefix;
  });
  if (filteredColors.length === 0) {
    return;
  }

  const filteredHex = filteredColors[0]?.shades?.filter(
    (shade) => shade.hex === hex
  );

  return filteredHex.length > 0 ? true : false;
};

export { checkColorNameDuplicates, checkColorHexDuplicates };
