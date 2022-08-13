export const generateSecondaryData = (e, data) => {
  const colorPrefix = e.target.value.split("-")[0];
  const colorSuffix = e.target.value.split("-")[1];

  const listData = [
    ...data.filter((color) => color.colorPrefix === colorPrefix),
  ];

  const shades = listData[0]?.shades;

  const renderedColorsArr = [];

  // If the value of the shade matches the first input value, don't add it to the secondary array
  shades?.map((shade) => {
    if (shade?.value === colorSuffix) {
      return;
    }
    renderedColorsArr.push(shade);
  });

  // Creating a new list object with the filtered data, removing the current color selected from the first input. This copy ensures the data list isn't mutated and the secondary list shows the correct data.
  const renderedColorsList = [{ colorPrefix, shades: [...renderedColorsArr] }];
  return renderedColorsList;
};
