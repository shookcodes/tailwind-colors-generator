import { useState, useEffect, useContext } from "react";
import { ColorsContext } from "../../context";
import ColorPreviewButton from "../ColorPreviewButton";
import PopupAlert from "../PopupAlert";
import SelectionGrid from "../SelectionGrid";

const ColorGeneratorForm = ({ setShadeAdded }) => {
  const { state, dispatch } = useContext(ColorsContext);

  const { listType, previousListType, generatedObject } = state || "";

  const {
    colorPrefix,
    primaryShade,
    secondaryShade,
    generatedShade,
    duplicateColor,
  } = generatedObject || "";

  const { currentSelectionColors, colorsPalette } = state || [];

  const { rgb, hex, value, name } = generatedShade;

  const [currentPaletteColor, setCurrentPaletteColor] = useState(null);
  const [duplicateAlert, setDuplicateAlert] = useState(false);
  const [isDuplicateHex, setIsDuplicateHex] = useState(false);

  // Sort each color's values from smallest to largest
  const sortColorValues = colorsPalette?.map((color) => {
    if (color.shades && color.shades?.length > 1) {
      color.shades?.sort((a, b) => {
        return a.value - b.value;
      });
    }
  });

  // Once "Add to palette" button is clicked, add the color to the palette array if there are no duplicates.
  const handleAddToPaletteClick = () => {
    sortColorValues;
    if (generatedObject.duplicateColor) {
      dispatch({ type: "deletePrimaryShade", type: "deleteSecondaryShade" });
      return setDuplicateAlert(true);
    } else {
      return dispatch({
        type: "addToPalette",
        data: {
          ...generatedObject,
        },
      });
    }
  };

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
          <SelectionGrid />

          <ColorPreviewButton
            backgroundColor={rgb}
            text={name}
            currentPaletteColor={currentPaletteColor}
            setCurrentPaletteColor={setCurrentPaletteColor}
            handleAddToPaletteClick={handleAddToPaletteClick}
            className={`transform ease-in-out duration-500 ${
              rgb
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
