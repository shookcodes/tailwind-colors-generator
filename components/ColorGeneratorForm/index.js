import { useState, useEffect, useContext } from "react";
import InputWithDropdown from "./InputWithDropdown";
import ColorPreviewButton from "../ColorPreviewButton";
import PopupAlert from "../PopupAlert";
import { tailwindColors } from "../../data/tailwindColors";
import {
  checkColorNameDuplicates,
  // checkColorHexDuplicates,
  convertFromHex,
  generateMedianRGB,
  generateColorName,
  convertToHex,
  checkColorHexDuplicates,
} from "../../utils";

const defaultTailwindColors = tailwindColors();
const ColorGeneratorForm = ({
  colorsPalette,
  setColorsPalette,
  setShadeAdded,
}) => {
  const [filteredTailwindColors, setFilteredTailwindColors] = useState([]);
  const [primaryInputData, setPrimaryInputData] = useState(null);
  const [secondaryInputData, setSecondaryInputData] = useState(null);
  const [generatedRGB, setGeneratedRGB] = useState(null);
  const [generatedColorName, setGeneratedColorName] = useState("");
  const [currentPaletteColor, setCurrentPaletteColor] = useState(null);
  const [duplicateAlert, setDuplicateAlert] = useState(false);
  const [isDuplicateHex, setIsDuplicateHex] = useState(false);

  // Sort each color's values from smallest to largest
  const sortColorValues = colorsPalette.map((color) => {
    if (color.shades && color.shades?.length > 1) {
      color.shades?.sort((a, b) => {
        return a.value - b.value;
      });
    }
  });
  // Once "Add to palette" button is clicked, add the color to the palette array if there are no duplicates. Pass the paletteArr to the parent component for data handling.
  const handleAddToPaletteClick = (obj) => {
    const { colorPrefix, shade } = obj();
    setCurrentPaletteColor(obj());
    const hex = shade.hex;
    const currentName = colorPrefix + "-" + shade.value;

    console.log("ob", isDuplicateHex, obj());
    sortColorValues;
    if (colorsPalette.length === 0) {
      setColorsPalette([{ colorPrefix, shades: [{ ...shade }] }]);
    } else {
      // console.log('filter', colorsPalette.filter(color => {`${color.colorPefix}-`}))
      if (isDuplicateHex) {
        setDuplicateAlert(true);
        // setIsDuplicateHex(false);
      }

      const paletteDuplicates = () => {
        return checkColorNameDuplicates(colorsPalette, currentName)
          ? checkColorNameDuplicates(colorsPalette, currentName)
          : false;
      };

      if (!paletteDuplicates().duplicatePrefix) {
        console.log("go to dup prefix click");
        return setColorsPalette([
          ...colorsPalette,
          { colorPrefix, shades: [{ ...shade }] },
        ]);
      }

      if (
        paletteDuplicates().duplicatePrefix &&
        !paletteDuplicates().duplicateValue
      ) {
        console.log("got to duplicate value click");
        return setColorsPalette([
          ...colorsPalette,
          colorPrefix,
          { shades: [{ ...shade }] },
        ]);
      }
      // setColorsPalette(() => {
      //   return [
      //     ...colorsPalette,
      //     {
      //       colorPrefix,
      //       shades: [{ ...shade }],
      //     },
      //   ];
      // });
    }
    // else if (duplicatePrefix && !duplicateValue) {
    //   const colorObject = colorsPalette.filter((color) => {
    //     return color.colorPrefix === colorPrefix;
    //   });

    //   // setShadeAdded lets the parent component know that a shade has been added to the palette so the ColorPalette and CodeBox components are re-rendered correctly.
    //   setShadeAdded(shade);

    //   return colorObject[0].shades.push({ ...shade });
    // }
    // }
  };

  // This useEffect takes the data from both inputs and creates a new color object that can be added to the colorsPalette array.
  useEffect(() => {
    if (primaryInputData === null) {
      setSecondaryInputData(null);
    }

    if (primaryInputData === null || secondaryInputData === null) {
      setCurrentPaletteColor(null);
      setSecondaryInputData(null);
      // setGeneratedRGB(null);
      setGeneratedColorName("");
    }

    if (
      primaryInputData !== null &&
      secondaryInputData !== null &&
      secondaryInputData.shade.hex
    ) {
      const primaryRGB = convertFromHex(primaryInputData.shade.hex);
      const secondaryRGB = convertFromHex(secondaryInputData?.shade.hex);
      const colorPrefix = secondaryInputData.colorPrefix;
      const primaryColorValue = primaryInputData.shade.value;
      const secondaryColorValue = secondaryInputData.shade.value;

      if (primaryInputData.colorPrefix !== colorPrefix) {
        return setSecondaryInputData(null);
      }
      // generate RGB for the median color
      setGeneratedRGB(generateMedianRGB(primaryRGB, secondaryRGB));
      const colorObject = {
        colorPrefix,
        primaryColorValue,
        secondaryColorValue,
      };
      let currentName = generateColorName({ ...colorObject });

      const increaseColorValue = () => {
        return (currentName =
          currentName.split("-")[0] +
          "-" +
          (parseInt(currentName.split("-")[1]) + 1));
      };
      if (generatedRGB) {
        setIsDuplicateHex(false);
        // defaultDuplicates  checks for duplicates of the default Tailwind colors. Returns false if no duplicates are found, otherwise return checkColorNameDuplicates's value
        const defaultDuplicates = () => {
          return checkColorNameDuplicates(defaultTailwindColors, currentName)
            ? checkColorNameDuplicates(defaultTailwindColors, currentName)
            : false;
        };

        // paletteDuplicates  checks for duplicates of the colorsPalette array. Returns false if no duplicates are found, otherwise return checkColorNameDuplicates's value
        const paletteDuplicates = () => {
          return checkColorNameDuplicates(colorsPalette, currentName)
            ? checkColorNameDuplicates(colorsPalette, currentName)
            : false;
        };

        if (!defaultDuplicates().duplicateValue) {
          return setGeneratedColorName(currentName);
        }

        console.log("here 1");
        // If a duplicate is found in the default array, increase the value of the currentName by one.
        if (defaultDuplicates().duplicateValue) {
          increaseColorValue(currentName);
          console.log("increased", currentName);
          console.log("got to first", colorsPalette);

          // If colorValue is empty, set the generatedColorName to the currentName
          if (colorsPalette.length === 0) {
            return setGeneratedColorName(currentName);
          }
          return generatedColorName;
        }
        console.log("default", generatedColorName, paletteDuplicates());

        if (colorsPalette.length > 0) {
          if (!paletteDuplicates().duplicatePrefix) {
            return setGeneratedColorName(currentName);
          }
          if (paletteDuplicates().duplicatePrefix) {
            console.log("got to duplicatePrefix");
            if (
              checkColorHexDuplicates(
                colorsPalette,
                currentName.split("-")[0],
                convertToHex(generatedRGB)
              )
            ) {
              console.log("DUP HEX");
              setIsDuplicateHex(() => {
                return true;
              });
              return setGeneratedColorName(currentName);
            }

            if (paletteDuplicates().duplicateValue) {
              checkColorNameDuplicates(
                colorsPalette,
                currentName,
                (duplicatePrefix, duplicateValue) => {
                  if (duplicateValue) {
                    increaseColorValue(currentName);
                    console.log("increased", currentName);
                  } else {
                    return setGeneratedColorName(() => {
                      return currentName;
                    });
                  }
                }
              );
            }
            return setGeneratedColorName(currentName);
            //   currentName =
            //     currentName.split("-")[0] +
            //     "-" +
            //     (parseInt(currentName.split("-")[1]) + 1);

            // }
          }
        }
        // if (
        //   defaultDuplicate().duplicatePrefix &&
        //   defaultDuplicate().duplicateValue
        // ) {
        //   console.log("go there");
        //   currentName =
        //     currentName.split("-")[0] +
        //     "-" +
        //     (parseInt(currentName.split("-")[1]) + 1);
        //   if (colorsPalette.length === 0) {
        //     return setGeneratedColorName(currentName);
        //   }
        // else if (colorsPalette.length > 0) {
        //   if (
        //     paletteDuplicate.duplicatePrefix &&
        //     paletteDuplicate.duplicateValue
        //   ) {
        //     currentName =
        //       currentName.split("-")[0] +
        //       "-" +
        //       (parseInt(currentName.split("-")[1]) + 1);
        //   } else {
        //     return;
        //   }
        // }
        console.log("dupse", currentName);
      }
      // setGeneratedColorName(currentName);
      // }
      // setGeneratedColorName();
    }
  }, [
    filteredTailwindColors,
    colorsPalette,
    primaryInputData,
    secondaryInputData,
    generatedRGB,
    generatedColorName,
  ]);

  return (
    <>
      <PopupAlert
        alertVisible={duplicateAlert}
        setAlertVisible={setDuplicateAlert}
      />
      <form
        className="h-full w-full mb-12 "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset className="flex w-full h-auto flex-col items-center ">
          <div className=" flex flex-col sm:flex sm:flex-row sm:flex-nowrap sm:items-start items-center justify-center relative w-full gap-6 sm:gap-4">
            <InputWithDropdown
              index={0}
              placeholder="Search for a color"
              isDisabled={false}
              data={defaultTailwindColors}
              setFilteredTailwindColors={setFilteredTailwindColors}
              inputData={primaryInputData}
              setInputData={setPrimaryInputData}
              colorPreviewHex={primaryInputData?.shade.hex}
            />
            <InputWithDropdown
              index={1}
              placeholder="Search for a color"
              isDisabled={primaryInputData ? false : true}
              data={filteredTailwindColors}
              inputData={secondaryInputData}
              setInputData={setSecondaryInputData}
              colorPreviewHex={
                secondaryInputData?.shade ? secondaryInputData.shade.hex : null
              }
            />
            <ColorPreviewButton
              backgroundColor={generatedRGB}
              text={generatedColorName}
              currentPaletteColor={currentPaletteColor}
              setCurrentPaletteColor={setCurrentPaletteColor}
              handleAddToPaletteClick={handleAddToPaletteClick}
              className={`transform ease-in-out duration-500 ${
                generatedRGB
                  ? "translate-x-0 w-full sm:w-8/12 opacity-100"
                  : "-translate-x-100 w-0 opacity-0"
              }`}
            />
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ColorGeneratorForm;
