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

const defaultTailwindColors = tailwindColors();
const ColorGeneratorForm = ({
  colorsPalette,
  setColorsPalette,
  setShadeAdded,
}) => {
  const [filteredTailwindShades, setFilteredTailwindShades] = useState([]);

  const [generatedRGB, setGeneratedRGB] = useState(null);
  const [generatedColorName, setGeneratedColorName] = useState("");
  const [currentPaletteColor, setCurrentPaletteColor] = useState(null);
  const [duplicateAlert, setDuplicateAlert] = useState(false);
  const [isDuplicateHex, setIsDuplicateHex] = useState(false);

  const [colorObject, setColorObject] = useState(null);
  const [shadeObject, setShadeObject] = useState(null);

  const [visibleListIndex, setVisibleListIndex] = useState(0);

  const [grids, setGrids] = useState([]);
  const [currentListData, setCurrentListData] = useState(null);
  useEffect(() => {
    document !== undefined &&
      setGrids(Array.from(document.querySelectorAll(".selectionGrid")));
  }, []);

  useEffect(() => {
    console.log("VIS", visibleListIndex);
    // console.log("cur1", currentListData);
    grids?.map((grid, gridIndex) => {
      console.log("GR", gridIndex);
      if (gridIndex === visibleListIndex) {
        return randomizeOpacity(grid, false);
      } else {
        return randomizeOpacity(grid, true);
      }
    });
  }, [visibleListIndex, grids]);

  console.log("listtttt", currentListData);
  // Sort each color's values from smallest to largest
  const sortColorValues = colorsPalette.map((color) => {
    if (color.shades && color.shades?.length > 1) {
      color.shades?.sort((a, b) => {
        return a.value - b.value;
      });
    }
  });

  // Generate the data for the secondary grid
  const generateShadesListData = async (e, data, listIndex) =>
    generateListData(e, data, listIndex);

  const handleButtonData = async (clickData) => {
    const { e, colorObject, data, index } = clickData();

    console.log("DATA", data);
    if (index === 0) {
      const listData = await generateShadesListData(e, data, index);

      setVisibleListIndex(1);
      setCurrentListData(listData);
      setFilteredTailwindShades(listData);
    } else if (index === 1) {
      setVisibleListIndex(0);
      setCurrentListData(defaultTailwindColors);
    }
  };
  console.log("cur", currentListData);

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
            <div className="relative border w-full h-128 border-gray-200 rounded-md place-content-center shadow-lg bg-gray-100 max-w-xl">
              {visibleListIndex !== 0 && (
                <button
                  onClick={() => {
                    setVisibleListIndex(() => {
                      return 0;
                    });
                  }}
                  className="absolute z-10 w-6 h-6 top-4 right-4 "
                >
                  <IoMdClose className="pointer-events-none" />
                </button>
              )}
              <SelectionGrid
                index={0}
                data={defaultTailwindColors}
                // visibleListIndex={visibleListIndex}
                handleButtonData={handleButtonData}
              />
              <SelectionGrid
                index={1}
                data={filteredTailwindShades}
                // visibleListIndex={visibleListIndex}
                columns="3"
                handleButtonData={handleButtonData}
                // visibleListIndex={secondaryGridVisible}
              />
            </div>
            {/* <SelectionGrid
              index={1}
              placeholder="Choose 1st shade"
              // isDisabled={primaryInputData ? false : true}
              data={filteredTailwindShades}
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
              data={filteredTailwindShades}
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
