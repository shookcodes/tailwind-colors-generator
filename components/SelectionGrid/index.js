import { useEffect, useContext } from "react";
import { ColorsContext } from "../../context";
import { IoMdClose } from "react-icons/io";
import { colorsObject } from "../../data/colorsObject";
import { randomizeOpacity } from "../../animations/randomizeOpacity.js";
import { transitionHeight } from "../../animations/transitionHeight";
import { convertToHex, convertFromHex, toggleTextColor } from "../../utils";

const SelectionGrid = ({ defaultData, className, index }) => {
  const { state, dispatch } = useContext(ColorsContext);

  const {
    currentSelectionColors,
    listType,
    previousListType,
    generatedObject,
  } = state;
  const { primaryShade, secondaryShade, addedToPalette } =
    generatedObject || "";
  const handleButtonMouseOut = (e) => {
    if (!e.relatedTarget || e.relatedTarget.type !== "button") {
    }
  };
  const gridButtons = () => [...document.querySelectorAll(".gridButton")];

  const handleButtonClick = async ({ colorObject }) => {
    if (listType === "primary") {
      // Remove buttons from the grid so secondary data can be displayed
      randomizeOpacity(gridButtons(), false);
      return setTimeout(() => {
        return dispatch({
          type: "showSecondaryGrid",
          data: colorObject,
        });
      }, 501);
    }

    if (listType === "secondary") {
      if (!primaryShade.rgb || !secondaryShade.rgb) {
      }
      // If secondary data is displayed, add the first color clicked as the primary shade

      if (!primaryShade?.rgb) {
        return dispatch({
          type: "createPrimaryShade",
          data: colorObject,
        });
      }

      // If a user clicks the button that was already selected for the primary shade, remove the primary shade
      if (primaryShade?.value === colorObject?.shade?.value) {
        return dispatch({
          type: "deletePrimaryShade",
        });
      } else if (primaryShade?.rgb && !secondaryShade?.rgb && !addedToPalette) {
        return dispatch({
          type: "createSecondaryShade",
          data: colorObject,
        });
      } else if (secondaryShade?.value === colorObject?.shade?.value) {
        return dispatch({
          type: "deleteSecondaryShade",
        });
      }
    }
  };
  const handleCloseButtonClick = () => {
    randomizeOpacity(gridButtons(), false);

    setTimeout(() => {
      dispatch({
        type: "showPrimaryGrid",
      });
    }, 501);
  };
  useEffect(() => {
    if (state.currentSelectionColors?.length === 0 && listType?.length === 0) {
      return dispatch({ type: "showPrimaryGrid" });
    }
    if (listType === "primary") {
      randomizeOpacity(gridButtons(), true);
    }
    if (listType === "secondary" && previousListType === "primary") {
      randomizeOpacity(gridButtons(), true);
    }
    if (primaryShade?.rgb && secondaryShade?.rgb) {
      return dispatch({ type: "createGeneratedShade" });
    }
  }, [
    currentSelectionColors.length,
    dispatch,
    listType,
    previousListType,
    primaryShade,
    secondaryShade.rgb,
    state.currentSelectionColors?.length,
  ]);

  return (
    <div id="gridWrapper">
      {listType === "secondary" && (
        <button
          onClick={(e) => {
            handleCloseButtonClick();
            // handleButtonData(e);
          }}
          className="absolute z-10 w-7 h-7 top-3 right-3 "
        >
          <IoMdClose className="pointer-events-none" />
        </button>
      )}

      <div
        id={`selectionGrid`}
        className={`flex flex-1 flex-wrap mx-auto mt-0 p-2 sm:p-4 transform transition-all duration-200 delay-500 gap-4
       w-full selectionGrid ${className}`}
      >
        {currentSelectionColors &&
          currentSelectionColors.map(({ colorPrefix, shades }, dataIndex) => {
            return shades.map((shade, shadeIndex) => {
              const tailwindName = colorPrefix + "-" + shade.value;
              const textColor = toggleTextColor(convertFromHex(shade.hex));

              const hoverColorsArr = [
                shades
                  .filter((shade, arrIndex) => {
                    if (arrIndex !== 0) return shade;
                  })
                  .map((shade) => {
                    return shade.hex;
                  }),
              ];

              return (
                <button
                  key={"btn-" + colorPrefix + "-" + shadeIndex}
                  className={`transform transition-all ease-in-out justify-center items-center rounded-lg w-16 h-16 origin-center opacity-0 scale-0 forwards gridButton  ${textColor}`}
                  id={tailwindName}
                  value={tailwindName}
                  type="button"
                  style={{
                    background: shade.hex,
                  }}
                  onClick={(e) => {
                    const colorObject = {
                      colorPrefix: colorPrefix,
                      shade: { hex: shade.hex, value: shade.value },
                    };
                    e.preventDefault();
                    // Pass the index value of parent component for event handling
                    handleButtonClick({ colorObject, index });
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.opacity = 0.8;
                    e.currentTarget.style.border = `8px solid orange outset`;
                    // e.currentTarget.style.opacity = 0.7;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = shade.hex;
                    e.currentTarget.style.opacity = 1;

                    handleButtonMouseOut(e);
                  }}
                >
                  <span>
                    {listType === "primary" ? colorPrefix : shade.value}
                  </span>
                </button>
              );
            });
          })}
      </div>
    </div>
  );
};

export default SelectionGrid;
