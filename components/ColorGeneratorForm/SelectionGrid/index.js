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
  defaultData,
  handleButtonData,
  columns,
  className,
  index,
}) => {
  const handleButtonMouseOut = (e) => {
    if (!e.relatedTarget || e.relatedTarget.type !== "button") {
    }
  };

  const handleButtonClick = (colorObject) => {
    const list = document.querySelectorAll(".listItem");
    handleButtonData(colorObject, list, false);
  };
  useEffect(() => {
    const list = document?.querySelectorAll(".listItem");

    if (document !== undefined) {
      const listIndex = parseInt(
        document.querySelector(`#selectionGrid-${index}`).id.split("-")[1]
      );
      if (data && index === listIndex) {
        randomizeOpacity(list, false);
      }
    }
  }, [data, index, defaultData]);

  return (
    <ul
      id={`selectionGrid-${index}`}
      className={` mx-auto mt-0 p-2 sm:p-4 
        grid ${
          columns ? `xs:grid-cols-${columns}` : "sm:grid-cols-4"
        } grid-cols-2 gap-4 w-full h-max transform duration-200 transition-all max-h-120 selectionGrid ${className}`}
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
              <li
                key={"btn-" + item.colorPrefix + "-" + shadeIndex}
                className={`opacity-0 listItem`}
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
                    const colorObject = {
                      colorPrefix: item.colorPrefix,
                      shades: { hex: shade.hex, value: shade.value },
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
              </li>
            );
          })
        )}
    </ul>
  );
};

export default SelectionGrid;
