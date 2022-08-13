const _scrubRGB = (rgb) => {
  let sliced = rgb.substring(4).slice(0, -1).split(",");

  const data = {};
  data.r = sliced[0];
  data.g = sliced[1];
  data.b = sliced[2];
  return data;
};

// combine rgbs to get median color in rgb format
const generateMedianRGB = (primaryRGB, secondaryRGB) => {
  // scrubs rgbs to objects with digits only
  const primary = _scrubRGB(primaryRGB);
  const secondary = _scrubRGB(secondaryRGB);

  function combine(primary, secondary) {
    return Math.round((parseInt(primary) + parseInt(secondary)) / 2);
  }
  const combinedR = combine(primary.r, secondary.r);
  const combinedG = combine(primary.g, secondary.g);
  const combinedB = combine(primary.b, secondary.b);

  const generatedRGB = `rgb(${combinedR}, ${combinedG}, ${combinedB})`;

  return generatedRGB;
};

export { generateMedianRGB };
