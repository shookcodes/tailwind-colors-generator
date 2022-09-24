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
  randomizeOpacity,
} from "../../utils";
import SelectionGrid from "./SelectionGrid";
import { IoMdClose } from "react-icons/io";

const ColorGeneratorForm = ({
  colorsPalette,
  setColorsPalette,
  setShadeAdded,
}) => {
  const [filteredTailwindColors, setFilteredTailwindColors] = useState([
    ...baseTailwindColors(),
  ]);

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

  const handleCloseButtonClick = () => {
    setUseDefaultFilter(true);
    setFilteredTailwindColors([...baseTailwindColors()]);
  };
  // Generate the data for the secondary grid
  const generateShadesListData = async (colorObject, listIndex) =>
    generateListData({ ...colorObject });

  const handleButtonData = async ({ colorObject }, list, isDefault) => {
    if (isDefault === true) {
      setFilteredTailwindColors([...baseTailwindColors()]);
    } else {
      const listData = await generateShadesListData(colorObject);
      randomizeOpacity(list, true);

      setTimeout(() => {
        setFilteredTailwindColors(() => {
          return listData;
        });
        setUseDefaultFilter(false);
      }, 401);
    }
  };

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
          <div className=" flex flex-col md:flex md:flex-row md:flex-nowrap md:items-start items-start justify-center relative w-full gap-6 md:gap-4">
            {filteredTailwindColors && (
              <div className="relative border w-full h-128 border-gray-200 rounded-md shadow-lg bg-gray-100 max-w-xl">
                {!useDefaultFilter && (
                  <button
                    onClick={(e) => {
                      handleCloseButtonClick();
                      // handleButtonData(e);
                    }}
                    className="absolute z-10 w-6 h-6 top-4 right-4 "
                  >
                    <IoMdClose className="pointer-events-none" />
                  </button>
                )}

                <SelectionGrid
                  // key={index}
                  index={0}
                  data={filteredTailwindColors}
                  // visibleListIndex={visibleListIndex}
                  // columns="3"
                  defaultData={useDefaultFilter}
                  handleButtonData={handleButtonData}
                  setUseDefaultFilter={setUseDefaultFilter}
                  // visibleListIndex={secondaryGridVisible}
                />
                {/* <SelectionGrid
                  // key={index}
                  index={1}
                  data={filteredTailwindColors}
                  // visibleListIndex={visibleListIndex}
                  // columns="3"
                  showList={useDefaultFilter}
                  handleButtonData={handleButtonData}
                  // visibleListIndex={secondaryGridVisible}
                /> */}
              </div>
            )}

            {/* <SelectionGrid
              index={1}
              placeholder="Choose 1st shade"
              // isDisabled={primaryInputData ? false : true}
              data={filteredTailwindColors}
              setList={setSecondaryShadeList}
              inputData={secondaryInputData}
              setInputData={setSecondaryInputData}
              colorPreviewHex={
                secondaryInputData?.shade ? secondaryInputData.shade.hex : null
              }
            /> */}
            {/* <InputWithDropdown
              index={1}
              placeholder="Choose 1st shade"
              isDisabled={primaryInputData ? false : true}
              data={filteredTailwindColors}
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
            /> */}
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
