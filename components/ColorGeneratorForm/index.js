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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("got here");
    if (currentPaletteColor?.shade !== undefined) {
      const currentColorObject = {
        colorPrefix: currentPaletteColor.colorPrefix,
        shades: [{ ...currentPaletteColor.shade }],
      };

      if (colorsPalette.length === 0) {
        setColorsPalette([currentColorObject]);
        return setCurrentPaletteColor(null);
      } else {
        if (
          checkColorHexDuplicates(
            colorsPalette,
            currentPaletteColor.colorPrefix,
            currentPaletteColor.shade.hex
          )
        ) {
          return setDuplicateAlert(true);
        } else {
        }
      }
    }
  };

  console.log(secondaryInputData, "2nd");
  useEffect(() => {
    if (primaryInputData === null) {
      setSecondaryInputData(null);
    }

    if (primaryInputData === null || secondaryInputData === null) {
      setCurrentPaletteColor(null);
      setGeneratedRGB(null);
      setGeneratedColorName("");
    }
    if (primaryInputData !== null && secondaryInputData !== null) {
      const primaryRGB = convertFromHex(primaryInputData.shade.hex);
      const secondaryRGB = convertFromHex(secondaryInputData?.shade.hex);
      const colorPrefix = secondaryInputData.colorPrefix;
      const primaryColorValue = primaryInputData.shade.value;
      const secondaryColorValue = secondaryInputData.shade.value;

      if (primaryInputData.colorPrefix !== colorPrefix) {
        setSecondaryInputData(null);
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

  console.log("cur", currentPaletteColor);
  useEffect(() => {
    if (currentPaletteColor !== null) {
      const { colorPrefix, shade } = currentPaletteColor;
      const hex = shade?.hex;
      if (colorsPalette.length === 0) {
        setColorsPalette([{ colorPrefix, shades: [{ ...shade }] }]);
        return setCurrentPaletteColor(null);
      } else {
        if (checkColorHexDuplicates(colorsPalette, colorPrefix, hex)) {
          return setDuplicateAlert(true);
        } else {
          const { duplicatePrefix, duplicateValue } = checkColorNameDuplicates(
            colorsPalette,
            colorPrefix,
            shade
          );

          console.log("prefix", duplicatePrefix, "\n value", duplicateValue);
          if (duplicatePrefix && !duplicateValue) {
            const colorObject = colorsPalette.filter((color) => {
              return color.colorPrefix === colorPrefix;
            });
            console.log("color", colorsPalette, colorObject);
            colorObject[0].shades.push({ ...shade });
          }
        }
      }
    }
    console.log("pal", colorsPalette);
  }, [colorsPalette, currentPaletteColor]);

  return (
    <>
      <PopupAlert
        alertVisible={duplicateAlert}
        setAlertVisible={setDuplicateAlert}
      />
      <form
        className="h-full w-full"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
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
            {/* {generatedRGB && ( */}
            <ColorPreviewButton
              backgroundColor={generatedRGB}
              text={generatedColorName}
              setCurrentPaletteColor={setCurrentPaletteColor}
              handleSubmit={handleSubmit}
              className={`transition-all ease-out duration-500  ${
                generatedRGB
                  ? "translate-x-0 w-full sm:w-8/12"
                  : "-translate-x-100 w-0 "
              }`}
            />
            {/* )} */}
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ColorGeneratorForm;
