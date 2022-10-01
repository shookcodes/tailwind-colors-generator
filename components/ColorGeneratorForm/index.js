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
} from "../../utils";
import SelectionGrid from "../SelectionGrid";

const ColorGeneratorForm = ({
  colorsPalette,
  setColorsPalette,
  setShadeAdded,
}) => {
  const [filteredTailwindColors, setFilteredTailwindColors] = useState([
    ...baseTailwindColors(),
  ]);

  const [primaryShade, setPrimaryShade] = useState(null);
  const [secondaryShade, setSecondaryShade] = useState(null);
  const [generatedRGB, setGeneratedRGB] = useState(null);
  const [generatedColorName, setGeneratedColorName] = useState("");
  const [currentPaletteColor, setCurrentPaletteColor] = useState(null);
  const [duplicateAlert, setDuplicateAlert] = useState(false);
  const [isDuplicateHex, setIsDuplicateHex] = useState(false);

  const [colorObject, setColorObject] = useState(null);
  const [shadeObject, setShadeObject] = useState(null);

  const [useDefaultFilter, setUseDefaultFilter] = useState(true);

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
    if (primaryShade !== null && secondaryShade !== null) {
      const primaryRGB = convertFromHex(primaryShade?.shade.hex);
      const secondaryRGB = convertFromHex(secondaryShade?.shade.hex);
      const colorPrefix = secondaryShade.colorPrefix;
      const primaryColorValue = primaryShade.shade.value;
      const secondaryColorValue = secondaryShade.shade.value;
      setIsDuplicateHex(false);

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
          tailwindColors(),
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
    colorsPalette,
    primaryShade,
    secondaryShade,
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
        className="h-full w-full border  flex flex-col  p-6 border-gray-200 rounded-md shadow-lg bg-gray-100 max-w-xl  transform transition-all duration-200  overflow-hidden "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset className="flex w-full h-auto flex-col items-center mb-12">
          {filteredTailwindColors && (
            <SelectionGrid
              defaultFilter={[...baseTailwindColors()]}
              useDefaultFilter={useDefaultFilter}
              setUseDefaultFilter={setUseDefaultFilter}
              filteredTailwindColors={filteredTailwindColors}
              setFilteredTailwindColors={setFilteredTailwindColors}
              primaryShade={primaryShade}
              setPrimaryShade={setPrimaryShade}
              secondaryShade={secondaryShade}
              setSecondaryShade={setSecondaryShade}
            />
          )}

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
        </fieldset>
      </form>
    </>
  );
};

export default ColorGeneratorForm;
