// This useEffect takes the data from both inputs and creates a new color object that can be added to the colorsPalette array.
// useEffect(() => {
//  if (
//     primaryInputData !== null &&
//     secondaryInputData !== null &&
//     tertiaryInputData !== null &&
//     secondaryInputData.shade.hex
//   ) {
//     const primaryRGB = convertFromHex(secondaryInputData?.shade.hex);
//     const secondaryRGB = convertFromHex(tertiaryInputData?.shade.hex);
//     const colorPrefix = secondaryInputData.colorPrefix;
//     const primaryColorValue = secondaryInputData.shade.value;
//     const secondaryColorValue = tertiaryInputData.shade.value;
//     setIsDuplicateHex(false);
//     if (primaryInputData.colorPrefix !== colorPrefix) {
//       setSecondaryInputData(null);
//       setTertiaryInputData(null);
//     }
//     // generate RGB for the median color
//     setGeneratedRGB(generateMedianRGB(primaryRGB, secondaryRGB));
//     const colorValues = {
//       colorPrefix,
//       primaryColorValue,
//       secondaryColorValue,
//     };

//     if (generatedRGB) {
//       const hex = convertToHex(generatedRGB);
//       setIsDuplicateHex(false);
//       const colorName = validateGeneratedColor(
//         defaultTailwindColors,
//         colorsPalette,
//         generateColorName({ ...colorValues }),
//         hex,
//         (currentName, duplicatePrefix, duplicateColor) => {
//           const currentPrefix = currentName.split("-")[0];
//           const currentValue = currentName.split("-")[1];
//           if (duplicateColor) {
//             return setIsDuplicateHex(true);
//           }
//           if (!duplicatePrefix) {
//             setColorObject({
//               colorPrefix: currentPrefix,
//               shades: [{ value: currentValue, hex, rgb: generatedRGB }],
//             });
//             return setShadeObject(null);
//           }
//           if (duplicatePrefix) {
//             setShadeObject({
//               colorPrefix: currentPrefix,
//               shade: { value: currentValue, hex, rgb: generatedRGB },
//             });
//             return setColorObject(null);
//           }
//         }
//       );

//       setGeneratedColorName(colorName);
//     }
//   }
// }, [
//   primaryShadeList,
//   colorsPalette,
//   primaryInputData,
//   secondaryInputData,
//   generatedRGB,
//   generatedColorName,
//   isDuplicateHex,
//   tertiaryInputData,
// ]);
