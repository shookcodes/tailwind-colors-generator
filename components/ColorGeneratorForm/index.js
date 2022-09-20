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

const defaultTailwindColors = tailwindColors();

const ColorGeneratorForm = ({
  colorsPalette,
  setColorsPalette,
  setShadeAdded,
}) => {
  const [filteredTailwindColors, setFilteredTailwindColors] = useState({
    primaryList: [],
    secondaryList: [],
  });
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

  // const [generatedColorObj, setGeneratedColorObj] = useState({
  //   colorPrefix: "",
  //   primaryValue: "",
  //   primaryRGB: "",
  //   secondaryRGB: "",
  //   secondaryValue: "",
  // });

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
    const generatedColorObj = {
      colorPrefix: "",
      primaryValue: "",
      primaryRGB: "",
      secondaryRGB: "",
      secondaryValue: "",
    };

    if (primaryInputData === null) {
      setSecondaryInputData(null);
      setTertiaryInputData(null);
    }

    if (primaryInputData === null || secondaryInputData === null) {
      setSecondaryInputData(null);
      setGeneratedRGB(null);
      setGeneratedColorName("");
    }
    if (primaryInputData !== null) {
      console.log("prim !null", primaryInputData);
      generatedColorObj.colorPrefix = primaryInputData.colorPrefix;
      // return setGeneratedColorObj({
      //   ...generatedColorObj,
      //   colorPrefix: primaryInputData.colorPrefix,
      // });
    }

    if (secondaryInputData !== null) {
      console.log("SEc", secondaryInputData);
      generatedColorObj.primaryRGB = convertFromHex(secondaryInputData.hex);
      generatedColorObj.primaryValue = secondaryInputData.value;
      //   console.log("2nd input", secondaryInputData);
      //   setGeneratedColorObj({
      //     ...generatedColorObj,
      //     primaryRGB: convertFromHex(secondaryInputData.hex),
      //     primaryValue: secondaryInputData.value,
      //   });
    }

    // if (tertiaryInputData !== null) {
    //   setGeneratedColorObj({
    //     ...generatedColorObj,
    //     secondaryRGB: convertFromHex(tertiaryInputData.hex),
    //     secondaryValue: tertiaryInputData.value,
    //   });
    // }

    if (secondaryInputData !== null && tertiaryInputData !== null) {
      const { primaryValue, secondaryValue } = generatedColorObj;

      console.log("PRIM, SEC", primaryValue, secondaryValue);

      setIsDuplicateHex(false);
      // if (primaryInputData.colorPrefix !== colorPrefix) {
      //   return setSecondaryInputData(null);
      // }
      // generate RGB for the median color
      setGeneratedRGB(generateMedianRGB(primaryRGB, secondaryRGB));
      const colorValues = {
        colorPrefix,
        primaryValue,
        secondaryValue,
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
    colorsPalette,
    primaryInputData,
    secondaryInputData,
    generatedRGB,
    generatedColorName,
    isDuplicateHex,
    tertiaryInputData,
  ]);

  const { primaryList, secondaryList } = filteredTailwindColors;
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
              placeholder="Choose base color"
              isDisabled={false}
              data={baseTailwindColors()}
              setFilteredTailwindColors={setFilteredTailwindColors}
              inputData={primaryInputData}
              setInputData={setPrimaryInputData}
              colorPreviewHex={primaryInputData?.shade?.hex}
            />
            <InputWithDropdown
              index={1}
              placeholder="Select 1st shade"
              isDisabled={primaryInputData ? false : true}
              data={primaryList}
              setFilteredTailwindColors={setFilteredTailwindColors}
              inputData={secondaryInputData}
              setInputData={setSecondaryInputData}
              colorPreviewHex={secondaryInputData}
            />
            <InputWithDropdown
              index={2}
              placeholder="Select 2nd shade"
              isDisabled={primaryInputData && secondaryInputData ? false : true}
              data={secondaryList}
              inputData={tertiaryInputData}
              setInputData={setTertiaryInputData}
              colorPreviewHex={tertiaryInputData}
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
