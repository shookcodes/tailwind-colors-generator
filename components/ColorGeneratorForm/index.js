import { useState, useEffect, useContext } from "react";
import InputWithDropdown from "./InputWithDropdown";
import ColorPreviewButton from "../ColorPreviewButton";
import PopupAlert from "../PopupAlert";
import { tailwindColors, baseTailwindColors } from "../../data/tailwindColors";
import {
  convertFromHex,
  generateMedianRGB,
  generateColorName,
  convertToHex,
  validateGeneratedColor,
  generateListData,
} from "../../utils";

const defaultTailwindColors = tailwindColors();
const ColorGeneratorForm = ({
  colorsPalette,
  setColorsPalette,
  setShadeAdded,
}) => {
  const [primaryShadeList, setPrimaryShadeList] = useState([]);
  const [secondaryShadeList, setSecondaryShadeList] = useState([]);
  const [primaryInputData, setPrimaryInputData] = useState(null);
  const [secondaryInputData, setSecondaryInputData] = useState(null);
  const [tertiaryInputData, setTertiaryInputData] = useState(null);
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
      setTertiaryInputData(null);
      // setGeneratedRGB(null);
      // setGeneratedColorName("");
    }
    if (tertiaryInputData === null || secondaryInputData === null) {
      setGeneratedRGB(null);
      setGeneratedColorName("");
    }

    if (
      primaryInputData !== null &&
      secondaryInputData !== null &&
      tertiaryInputData !== null &&
      secondaryInputData.shade.hex
    ) {
      const primaryRGB = convertFromHex(secondaryInputData?.shade.hex);
      const secondaryRGB = convertFromHex(tertiaryInputData?.shade.hex);
      const colorPrefix = secondaryInputData.colorPrefix;
      const primaryColorValue = secondaryInputData.shade.value;
      const secondaryColorValue = tertiaryInputData.shade.value;
      setIsDuplicateHex(false);
      if (primaryInputData.colorPrefix !== colorPrefix) {
        setSecondaryInputData(null);
        setTertiaryInputData(null);
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
    primaryShadeList,
    colorsPalette,
    primaryInputData,
    secondaryInputData,
    generatedRGB,
    generatedColorName,
    isDuplicateHex,
    tertiaryInputData,
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
          <div className=" flex flex-col md:flex md:flex-row md:flex-nowrap md:items-start items-center justify-center relative w-full gap-6 md:gap-4">
            <InputWithDropdown
              index={0}
              placeholder="Select base color"
              isDisabled={false}
              data={baseTailwindColors()}
              setList={setPrimaryShadeList}
              inputData={primaryInputData}
              setInputData={setPrimaryInputData}
              colorPreviewHex={primaryInputData?.shade.hex}
            />
            <InputWithDropdown
              index={1}
              placeholder="Choose 1st shade"
              isDisabled={primaryInputData ? false : true}
              data={primaryShadeList}
              setList={setSecondaryShadeList}
              inputData={secondaryInputData}
              setInputData={setSecondaryInputData}
              colorPreviewHex={
                secondaryInputData?.shade ? secondaryInputData.shade.hex : null
              }
            />
            <InputWithDropdown
              index={2}
              placeholder="Choose 2nd shade"
              isDisabled={primaryInputData && secondaryInputData ? false : true}
              data={secondaryShadeList}
              inputData={tertiaryInputData}
              setInputData={setTertiaryInputData}
              colorPreviewHex={
                tertiaryInputData?.shade ? tertiaryInputData.shade.hex : null
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
