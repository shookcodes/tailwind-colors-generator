import { useState, useEffect, useContext } from "react";
import InputWithDropdown from "./InputWithDropdown";
import ColorPreviewButton from "../ColorPreviewButton";
import PopupAlert from "../PopupAlert";
import { tailwindColors } from "../../data/tailwindColors";
import {
  convertFromHex,
  generateMedianRGB,
  generateColorName,
  convertToHex,
  validateGeneratedColor,
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

  const [colorObject, setColorObject] = useState(null);
  const [shadeObject, setShadeObject] = useState(null);

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

    sortColorValues;
    if (colorsPalette.length === 0) {
      setColorsPalette([{ colorPrefix, shades: [{ ...shade }] }]);
    } else {
      if (isDuplicateHex) {
        setDuplicateAlert(true);
      } else {
        if (shadeObject) {
          const { colorPrefix } = shadeObject;

          const filteredColor = colorsPalette.filter((color) => {
            if (color.colorPrefix === colorPrefix) {
              return color.shades.push(shadeObject.shade);
            }
          });
          setColorsPalette([...colorsPalette]);

          setShadeAdded(true);
        } else if (colorObject) {
          setColorsPalette([
            ...colorsPalette,
            {
              colorPrefix: colorObject.colorPrefix,
              shades: [{ ...colorObject.shades[0] }],
            },
          ]);
          setColorObject(() => {
            return null;
          });
        }
      }
    }
    return setShadeAdded(true);
    // setShadeAdded triggers ColorPalette and CodeBox to re-render once shade is added to colorPalette
  };

  // This useEffect takes the data from both inputs and creates a new color object that can be added to the colorsPalette array.
  useEffect(() => {
    if (primaryInputData === null) {
      setSecondaryInputData(null);
    }

    if (primaryInputData === null || secondaryInputData === null) {
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
      setIsDuplicateHex(false);
      if (primaryInputData.colorPrefix !== colorPrefix) {
        return setSecondaryInputData(null);
      }
      // generate RGB for the median color
      setGeneratedRGB(generateMedianRGB(primaryRGB, secondaryRGB));
      const colorValues = {
        colorPrefix,
        primaryColorValue,
        secondaryColorValue,
      };

      if (generatedRGB) {
        const hex = convertToHex(generatedRGB);
        setIsDuplicateHex(false);
        const colorName = validateGeneratedColor(
          defaultTailwindColors,
          colorsPalette,
          generateColorName({ ...colorValues }),
          hex,
          (currentName, duplicatePrefix, duplicateColor) => {
            const currentPrefix = currentName.split("-")[0];
            const currentValue = currentName.split("-")[1];
            if (duplicateColor) {
              return setIsDuplicateHex(true);
            }
            if (!duplicatePrefix) {
              setColorObject({
                colorPrefix: currentPrefix,
                shades: [{ value: currentValue, hex, rgb: generatedRGB }],
              });
              return setShadeObject(null);
            }
            if (duplicatePrefix) {
              setShadeObject({
                colorPrefix: currentPrefix,
                shade: { value: currentValue, hex, rgb: generatedRGB },
              });
              return setColorObject(null);
            }
          }
        );

        setGeneratedColorName(colorName);
      }
    }
  }, [
    filteredTailwindColors,
    colorsPalette,
    primaryInputData,
    secondaryInputData,
    generatedRGB,
    generatedColorName,
    isDuplicateHex,
  ]);

  return (
    <>
      <PopupAlert
        alertVisible={duplicateAlert}
        setAlertVisible={setDuplicateAlert}
      />
      <form
        id="colorGeneratorForm"
        className="h-full w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset className="flex w-full h-auto flex-col items-center mb-12">
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
