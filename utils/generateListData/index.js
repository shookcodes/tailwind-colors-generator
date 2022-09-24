import { tailwindColors } from "../../data/tailwindColors";

// This function generates the second dropdown list based on the color prefix and value of the first input
export const generateListData = ({ colorPrefix, ...shades }, index) => {
  // Filter out the colors that don't match the prefix
  const listData = [
    ...tailwindColors().filter((color) => color.colorPrefix === colorPrefix),
  ];

  const generatedShades = listData[0]?.shades;

  const renderedColorsArr = [];

  // If the value of the shade matches the first input value, don't add it to the secondary array
  generatedShades?.map((shade) => {
    // if (index !== 0 && shade?.value === colorSuffix) {
    //   return;
    // }
    renderedColorsArr.push(shade);
  });

  // Creating a new list object with the filtered data, removing the current color selected from the first input. This copy ensures the data list isn't mutated and the secondary list shows the correct data.
  const renderedColorsList = [{ colorPrefix, shades: [...renderedColorsArr] }];
  return renderedColorsList;
};
