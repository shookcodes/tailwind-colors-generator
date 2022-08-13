import * as tailwind from "../../node_modules/tailwindcss/src/public/colors.js";
const tailwindColors = () => {
  const tailwindColorsArr = [];
  Object.entries(tailwind.default).map((color, index) => {
    // keep following colors / hues out of array
    if (
      color[0].includes("inherit") ||
      color[0].includes("transparent") ||
      color[0].includes("current") ||
      color[0].includes("black") ||
      color[0].includes("white") ||
      color[0].includes("lightBlue") ||
      color[0].includes("warmGray") ||
      color[0].includes("trueGray") ||
      color[0].includes("coolGray") ||
      color[0].includes("blueGray")
    ) {
      return;
    } else {
      tailwindColorsArr.push({
        colorPrefix: color[0],
        shades: Array.from(
          Object.entries(color[1]).map((entry) => {
            return { value: entry[0], hex: entry[1] };
          })
        ),
      });
    }
  });
  return tailwindColorsArr;
};

export { tailwindColors };
