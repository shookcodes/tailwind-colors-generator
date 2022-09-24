import { useState, useEffect } from "react";
import {
  generateListData,
  convertToHex,
  convertFromHex,
  randomizeOpacity,
  toggleTextColor,
} from "../../../utils";

const SelectionGrid = ({
  data,
  index,
  handleButtonData,
  inputData,
  setInputData,
  setList,
  visibleListIndex,
  columns,
  className,
}) => {
  const handleButtonMouseOut = (e) => {
    if (!e.relatedTarget || e.relatedTarget.type !== "button") {
    }
  };

  return (
    <ul
      id={`selectionGrid-${index}`}
      className={`relative mx-auto mt-0 p-2 sm:p-4 
        grid ${
          columns ? `xs:grid-cols-${columns}` : "sm:grid-cols-4"
        } grid-cols-2 gap-4 scroll w-full h-max transform duration-200 transition-all max-h-120 selectionGrid ${className}`}
    >
      {data &&
        data.map((item, dataIndex) =>
          item.shades.map((shade, shadeIndex) => {
            const tailwindName = item.colorPrefix + "-" + shade.value;

            const textColor = toggleTextColor(convertFromHex(shade.hex));
            const colorObject = {
              colorPrefix: item.colorPrefix,
              shade: { hex: shade.hex, value: shade.value },
            };
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
              ((index === 0 && shade.value === "500") || index !== 0) && (
                <li
                  key={"btn-" + item.colorPrefix + "-" + shadeIndex}
                  className="opacity-0"
                >
                  <button
                    className={`marker:flex justify-between border-2  w-full py-3 items-center hover:cursor-pointer rounded-lg hover:shadow-inner dropdownListButton hover:animate-gradient ${textColor}`}
                    id={tailwindName}
                    value={tailwindName}
                    type="button"
                    style={{
                      background: shade.hex,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      // Pass the index value of parent component for event handling
                      handleButtonData(() => {
                        return { e, colorObject, data, index };
                      });
                    }}
                    onMouseOver={(e, index) => {
                      e.currentTarget.style.background = `linear-gradient(45deg, ${hoverColorsArr})`;
                      // ${item.shades[0].hex}
                      e.currentTarget.style.border = `8px solid orange outset`;
                      // e.currentTarget.style.opacity = 0.7;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = shade.hex;
                      e.currentTarget.style.opacity = 1;

                      handleButtonMouseOut(e);
                    }}
                  >
                    <span>{index === 0 ? item.colorPrefix : shade.value}</span>

                    {/* <div
                      className="w-4 h-4 rounded-md border border-gray-300 shadoww-sm shadow group-hover:w-6 group-hover:h-6 transition-all ease-in-out"
                      style={{ backgroundColor: shade.hex }}
                    ></div> */}
                  </button>
                </li>
              )
            );
          })
        )}
    </ul>
  );
};

export default SelectionGrid;
