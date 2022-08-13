const componentToHex = (value) => {
  var hex = value.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const convertToHex = (rgb) => {
  let sliced = rgb.substring(4).slice(0, -1).split(",");

  const r = parseInt(sliced[0]);
  const g = parseInt(sliced[1]);
  const b = parseInt(sliced[2]);

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

function _scrubHex(hex) {
  if (hex.charAt(0) === "#") {
    return (hex = hex.slice(1));
  }
}

const convertFromHex = (value) => {
  const data = {};
  let hex;

  // remove # from hex value
  const scrubbedHex = _scrubHex(value);

  hex = "0x" + scrubbedHex;
  data.r = (hex >> 16) & 0xff;
  data.g = (hex >> 8) & 0xff;
  data.b = hex & 0xff;

  return `rgb(${Math.round(data.r)}, ${Math.round(data.g)}, ${Math.round(
    data.b
  )})`;
};

export { convertToHex, convertFromHex };
