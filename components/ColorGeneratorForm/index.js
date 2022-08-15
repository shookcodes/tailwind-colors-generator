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
const ColorGeneratorForm = () => {
  const [filteredTailwindColors, setFilteredTailwindColors] = useState([]);
  const [primaryInputData, setPrimaryInputData] = useState(null);
  const [secondaryInputData, setSecondaryInputData] = useState(null);
  const [generatedRGB, setGeneratedRGB] = useState(null);
  const [generatedColorName, setGeneratedColorName] = useState("");
  const [currentPaletteColor, setCurrentPaletteColor] = useState(null);
  const [colorsPalette, setColorsPalette] = useState([]);
  const [duplicateAlert, setDuplicateAlert] = useState(false);

  const handleAddToPaletteClick = (obj) => {
    // e.preventDefault();
    const { colorPrefix, shade } = obj();
    setCurrentPaletteColor(obj);
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
          setColorsPalette([
            ...colorsPalette,
            {
              colorPrefix,
              shades: [{ ...shade }],
            },
          ]);
        } else if (duplicatePrefix && !duplicateValue) {
          const colorObject = colorsPalette.filter((color) => {
            return color.colorPrefix === colorPrefix;
          });
          return colorObject[0].shades.push({ ...shade });
        }
      }
    }
  };

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
  }, [
    colorsPalette,
    filteredTailwindColors,
    primaryInputData,
    secondaryInputData,
  ]);

  return (
    <>
      <PopupAlert
        alertVisible={duplicateAlert}
        setAlertVisible={setDuplicateAlert}
      />
      <form
        className="h-full w-full"
        // onSubmit={handleAddToPaletteClick}
      >
        <fieldset className="flex w-full h-auto flex-col items-center">
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
              isDisabled={filteredTailwindColors.length > 0 ? false : true}
              data={filteredTailwindColors}
              inputData={secondaryInputData}
              setInputData={setSecondaryInputData}
              colorPreviewHex={
                secondaryInputData?.shade.hex
                  ? secondaryInputData?.shade.hex
                  : ""
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
