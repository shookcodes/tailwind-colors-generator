import { useState, useEffect } from "react";
import InputWithDropdown from "./InputWithDropdown";
import ColorPreviewButton from "../ColorPreviewButton";
import { tailwindColors } from "../../data/tailwindColors";
import {
  convertFromHex,
  generateMedianRGB,
  generateColorName,
} from "../../utils";
const defaultTailwindColors = tailwindColors();
const ColorGeneratorForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    return;
  };

  const [filteredTailwindColors, setFilteredTailwindColors] = useState([]);
  const [primaryInputData, setPrimaryInputData] = useState(null);
  const [secondaryInputData, setSecondaryInputData] = useState(null);
  const [generatedRGB, setGeneratedRGB] = useState(null);
  const [generatedHex, setGeneratedHex] = useState(null);
  const [generatedColorName, setGeneratedColorName] = useState("");
  const [currentPaletteColor, setCurrentPaletteColor] = useState({});
  // const [colorsPalette, setColorsPalette] = useState([]);
  const colorsPalette = [];

  useEffect(() => {
    if (primaryInputData !== null && secondaryInputData !== null) {
      const primaryRGB = convertFromHex(primaryInputData.shade.hex);
      const secondaryRGB = convertFromHex(secondaryInputData?.shade.hex);
      const colorPrefix = secondaryInputData.colorPrefix;
      const primaryColorValue = primaryInputData.shade.value;
      const secondaryColorValue = secondaryInputData.shade.value;

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

  useEffect(() => {
    if (currentPaletteColor) {
      if (colorsPalette.length === 0) {
        colorsPalette.push({
          colorPrefix: currentPaletteColor.colorPrefix,
          shades: [{ ...currentPaletteColor.shade }],
        });
      }

      const paletteColor = colorsPalette.find((color) => {
        color.colorPrefix === currentPaletteColor.colorPrefix;
      });
    }
  }, [colorsPalette, currentPaletteColor]);
  return (
    <form
      className="h-full w-full"
      onSubmit={(e) => {
        return handleSubmit(e);
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
            setInputData={setPrimaryInputData}
            colorPreviewHex={primaryInputData?.shade.hex}
          />
          <InputWithDropdown
            index={1}
            placeholder="Search for a color"
            isDisabled={filteredTailwindColors.length > 0 ? false : true}
            data={filteredTailwindColors}
            setInputData={setSecondaryInputData}
            colorPreviewHex={secondaryInputData?.shade.hex}
          />
          <ColorPreviewButton
            backgroundColor={generatedRGB}
            text={generatedColorName}
            setCurrentPaletteColor={setCurrentPaletteColor}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default ColorGeneratorForm;
