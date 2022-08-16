const _scrubRGB = (rgb) => {
  let sliced = rgb.substring(4).slice(0, -1).split(",");

  const data = {};
  data.r = sliced[0];
  data.g = sliced[1];
  data.b = sliced[2];
  return data;
};

export const toggleTextColor = (rgb) => {
  if (rgb === "transparent") {
    return;
  }

  const colorLight = "text-gray-50";
  const colorDark = "text-gray-800";

  const { r, g, b } = _scrubRGB(rgb);

  function calculateBreakpoint(obj, value) {
    return Math.round(obj * value);
  }

  const calculatedR = calculateBreakpoint(r, 0.299);
  const calculatedG = calculateBreakpoint(g, 0.587);
  const calculatedB = calculateBreakpoint(b, 0.114);

  // calculate text color & set to default if args aren't passed in
  if ((calculatedR + calculatedG + calculatedB).toFixed(2) > 180) {
    return colorDark;
  } else {
    return colorLight;
  }
};
