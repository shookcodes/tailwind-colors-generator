import { useState, useEffect, useContext } from "react";
import InputWithDropdown from "./InputWithDropdown";
import ColorPreviewButton from "../ColorPreviewButton";
import PopupAlert from "../PopupAlert";
import { tailwindColors } from "../../data/tailwindColors";
import {
  checkColorNameDuplicates,
  checkColorHexDuplicates,
  convertFromHex,
  generateMedianRGB,
  generateColorName,
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

  // Once "Add to palette" button is clicked, add the color to the palette array if there are no duplicates. Pass the paletteArr to the parent component for data handling.
  const handleAddToPaletteClick = (obj) => {
    const { colorPrefix, shade } = obj();
    setCurrentPaletteColor(obj());
    const hex = shade.hex;
    if (colorsPalette.length === 0) {
      setColorsPalette([{ colorPrefix, shades: [{ ...shade }] }]);
    } else {
      if (checkColorHexDuplicates(colorsPalette, colorPrefix, hex)) {
        return setDuplicateAlert(true);
      } else {
        const { duplicatePrefix, duplicateValue } = checkColorNameDuplicates(
          colorsPalette,
          colorPrefix,
          shade
        );
        if (!duplicatePrefix) {
          setColorsPalette(() => {
            return [
              ...colorsPalette,
              {
                colorPrefix,
                shades: [{ ...shade }],
              },
            ];
          });
        } else if (duplicatePrefix && !duplicateValue) {
          const colorObject = colorsPalette.filter((color) => {
            return color.colorPrefix === colorPrefix;
          });

          // setShadeAdded lets the parent component know that a shade has been added to the palette so the ColorPalette and CodeBox components are re-rendered correctly.
          setShadeAdded(shade);

          return colorObject[0].shades.push({ ...shade });
        }
      }
    }
  };

  // This useEffect takes the data from both inputs and creates a new color object that can be added to the colorsPalette array.
  useEffect(() => {
    if (primaryInputData === null) {
      setSecondaryInputData(null);
    }

    if (primaryInputData === null || secondaryInputData === null) {
      setCurrentPaletteColor(null);
      setSecondaryInputData(null);
      setGeneratedRGB(null);
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
        data: defaultTailwindColors,
      };
      setGeneratedColorName(generateColorName({ ...colorObject }));

      // setGeneratedColorName();
    }
  }, [filteredTailwindColors, primaryInputData, secondaryInputData]);

  return (
    <>
      <PopupAlert
        alertVisible={duplicateAlert}
        setAlertVisible={setDuplicateAlert}
      />
      <form
        className="h-full w-full mb-12 "
        // onSubmit={handleAddToPaletteClick}
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
