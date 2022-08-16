import { useEffect, useState } from "react";
import { MdInvertColorsOff, MdRemove } from "react-icons/md";
// import { toggleTextColor } from "../../utils/toggleTextColor";

const ColorsPalette = ({
  colorsPalette,
  setColorsPaletteArr,
  shadeAdded,
  handleRemoveColor,
  textColor,
}) => {
  return (
    <div className="flex flex-col w-full h-full mb-12">
      {colorsPalette &&
        colorsPalette.length > 0 &&
        colorsPalette.map((color, colorIndex) => {
          const { colorPrefix } = color;

          return (
            <div key={colorIndex} className="w-full h-full mb-4">
              <span>{colorPrefix}</span>
              <div className="flex gap-4">
                {color.shades.map((shade, index) => {
                  const colorName = `${colorPrefix}-${shade.value}`;

                  {
                    /* TODO: Add toggle text func  */
                  }
                  return (
                    <div key={index} className=" text-gray-700 ">
                      <div
                        name={"block"}
                        key={index}
                        id={colorName}
                        className="relative w-16 h-16 rounded-lg border-gray-300 shadow-lg"
                        style={{ background: shade.hex }}
                        // onMouseEnter={(e) => {
                        //   handleBlockMouseEnter(e);
                        // }}
                        // onMouseLeave={(e) => {
                        //   handleBlockMouseLeave(e);
                        // }}
                        value={colorName}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ColorsPalette;

//   <div
//     name={"block"}
//     key={index}
//     id={color.generatedTwName}
//     className="relative w-full h-full rounded-lg border-gray-300 shadow-lg"
//     style={{ background: color.generatedRGB }}
//     onMouseEnter={(e) => {
//       handleBlockMouseEnter(e);
//     }}
//     onMouseLeave={(e) => {
//       handleBlockMouseLeave(e);
//     }}
//     value={color.generatedTwName}
//   >
//     <button
//       className={`absolute hidden right-0 top-1 mr-0.5 w-6 h-auto transform hover:scale-125 hover:opacity-80`}
//       onClick={(e) => {
//         handleRemoveColor(e);
//       }}
//       id={"removeButton-" + index}
//     >
//       {/* <MdRemove className={toggleTextColor(color.generatedRGB)} /> */}
//     </button>
//     <div
//       className={`flex flex-col justify-center w-full h-full items-center text-center gap-2 whitespace-nowrap text-sm p-4 ${toggleTextColor(
//         color.shade.hex
//       )}`}
//     >
//     </div>
//   </div>
