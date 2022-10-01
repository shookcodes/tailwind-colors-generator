import { useState, useEffect, useRef } from "react";
import { generateListData } from "../../utils";
import { IoMdClose } from "react-icons/io";

import { randomizeOpacity } from "../../animations/randomizeOpacity.js";
import { transitionHeight } from "../../animations/transitionHeight";
import { convertToHex, convertFromHex, toggleTextColor } from "../../utils";

const SelectionGrid = ({
  data,
  defaultData,
  columns,
  className,
  index,
  defaultFilter,
  useDefaultFilter,
  setUseDefaultFilter,
  filteredTailwindColors,
  setFilteredTailwindColors,
  primaryShade,
  setPrimaryShade,
  secondaryShade,
  setSecondaryShade,
  // prevButtons,
}) => {
  const [grid, setGrid] = useState("");
  const [gridButtons, setGridButtons] = useState([]);
  const queryGridButtons = () => [...document.querySelectorAll(".gridButton")];
  useEffect(() => {
    if (document !== undefined) {
      setGrid(document.querySelector("#selectionGrid"));
    }
  }, []);

  console.log("flit", filteredTailwindColors);

  const handleButtonMouseOut = (e) => {
    if (!e.relatedTarget || e.relatedTarget.type !== "button") {
    }
  };

  const handleButtonClick = async (colorObject) => {
    const listData = await generateShadesListData(colorObject);
    if (!isDefault) {
      if (primaryShade === null) {
        setPrimaryShade(colorObject);
      } else {
        setSecondaryShade(colorObject);
      }
    } else {
      if (primaryShade === null && secondaryShade === null) {
        // transitionHeight(grid);
        // randomizeOpacity(list, false);
        // transitionHeight(grid, false);
        setTimeout(() => {
          setFilteredTailwindColors(listData);
          setUseDefaultFilter(false);
        }, 401);
      }
    }
  };

  const handleCloseButtonClick = () => {
    const list = [...document.querySelectorAll(".gridButton")];
    setPrimaryShade(null);
    setSecondaryShade(null);
    randomizeOpacity(list, false);

    // transitionHeight(grid, false);

    setTimeout(() => {
      setFilteredTailwindColors(defaultFilter);
      setUseDefaultFilter(true);
    }, 401);
  };

  // Generate the data for the secondary grid
  const generateShadesListData = async (colorObject, listIndex) => {
    return generateListData({ ...colorObject });
  };

  // const prevousButtons = usePrevious(data, gridButtons);
  const randomize = randomizeOpacity(gridButtons, true);
  // console.log("prev", prevousButtons);

  // useEffect(() => {
  //   if (data) {
  //     console.log("grid bt", gridButtons);
  //   }
  // }, [data]);
  useEffect(() => {
    // console.log("gridButtons);
    if (document !== undefined) {
      // setTimeout(() => {
      //   randomize;
      // setGridButtons((prev) => [
      //   prev[prev.length > 0 && prev.length - 1],
      //   queryGridButtons(),
      // ]);
      setGridButtons(queryGridButtons());
      // transitionHeight(grid);
      // }, 401);
    }
  }, []);

  useEffect(() => {
    console.log("DEF", defaultData);
    if (!defaultData) {
      console.log("false");
      setGridButtons((prev) => [prev, ...queryGridButtons()]);
    }
    console.log("btns", gridButtons);
  }, [defaultData]);

  return (
    <div id="gridWrapper" className="border-2 border-blue-400">
      {!useDefaultFilter && (
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
        {data &&
          data.map((item, dataIndex) =>
            item.shades.map((shade, shadeIndex) => {
              const tailwindName = item.colorPrefix + "-" + shade.value;
              const textColor = toggleTextColor(convertFromHex(shade.hex));

              const hoverColorsArr = [
                item.shades
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
                  className={` transform transition-all ease-in-out justify-center 
            items-center rounded-lg opacity-0 forwards scale-0 w-16 h-16 origin-center gridButton  ${textColor}`}
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
                    e.currentTarget.style.background = `linear-gradient(45deg, ${hoverColorsArr})`;
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
            })
          )}
      </div>
    </div>
  );
};

export default SelectionGrid;
