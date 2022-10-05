import { useEffect, useContext } from "react";
import { ColorsContext } from "../../context";
import { IoMdClose } from "react-icons/io";

import { randomizeOpacity } from "../../animations/randomizeOpacity.js";
import { transitionHeight } from "../../animations/transitionHeight";
import { convertToHex, convertFromHex, toggleTextColor } from "../../utils";

const SelectionGrid = ({ defaultData, className, index }) => {
  const { state, dispatch } = useContext(ColorsContext);

  const { currentColors, listType, previousListType, generatedObject } = state;

  const { primaryShade, secondaryShade } = generatedObject || "";
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
        dispatch({
          type: "update",
          data: colorObject,
        });
      }, 501);
    }

    if (listType === "secondary") {
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
      } else if (primaryShade?.rgb && !secondaryShade?.rgb) {
        return dispatch({
          type: "createSecondaryShade",
          data: colorObject,
        });
      } else if (secondaryShade?.value === colorObject?.shade?.value) {
        return dispatch({
          type: "deleteSecondaryShade",
        });
      } else return;
    }
  };
  const handleCloseButtonClick = () => {
    randomizeOpacity(gridButtons(), false);

    setTimeout(() => {
      dispatch({
        type: "default",
      });
    }, 501);
  };

  useEffect(() => {
    if (!currentColors && !listType) {
      return dispatch({ type: "default" });
    }
    if (listType === "primary") {
      randomizeOpacity(gridButtons(), true);
    }
    if (listType === "secondary" && previousListType === "primary") {
      randomizeOpacity(gridButtons(), true);
    }
    if (primaryShade?.rgb && secondaryShade?.rgb) {
      dispatch({
        type: "createGeneratedShade",
      });
    }
  }, [
    dispatch,
    currentColors,
    listType,
    primaryShade,
    previousListType,
    secondaryShade?.rgb,
  ]);

  return (
    <div id="gridWrapper" className="border-2 border-blue-400">
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
        className={`flex flex-1 flex-wrap mx-auto mt-0 p-2 border-2 border-red-400 sm:p-4 transform transition-all duration-200 delay-500 gap-4
       w-full selectionGrid ${className}`}
      >
        {currentColors?.length > 0 &&
          currentColors.map((item, dataIndex) => {
            const { colorPrefix, shades } = item;
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
                  key={"btn-" + item.colorPrefix + "-" + shadeIndex}
                  className={`transform transition-all ease-in-out justify-center items-center rounded-lg w-16 h-16 origin-center opacity-0 scale-0 forwards gridButton  ${textColor}`}
                  id={tailwindName}
                  value={tailwindName}
                  type="button"
                  style={{
                    background: shade.hex,
                  }}
                  onClick={(e) => {
                    const colorObject = {
                      colorPrefix: item.colorPrefix,
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
                  <span>{defaultData ? item.colorPrefix : shade.value}</span>
                </button>
              );
            });
          })}
      </div>
    </div>
  );
};

export default SelectionGrid;
