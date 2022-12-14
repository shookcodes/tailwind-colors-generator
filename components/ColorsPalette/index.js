import { toggleTextColor } from "../../utils";
import { MdInvertColorsOff, MdRemove } from "react-icons/md";

const ColorsPalette = ({
  colorsPalette,
  setColorsPalette,
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
            <div
              key={colorIndex}
              className={`w-full h-full mb-4 ${
                colorIndex !== colorsPalette.length - 1 ? "mb-8" : ""
              }`}
            >
              <h2 className="mb-1">{colorPrefix}</h2>
              <div className="flex flex-wrap gap-6 justify-start">
                {color.shades.map((shade, index) => {
                  const colorName = `${colorPrefix}-${shade.value}`;

                  // TODO REMOVE CONDITIONAL AFTER BUG FIXES
                  const textColor = toggleTextColor(shade?.rgb);

                  return (
                    <div
                      key={index}
                      className="text-gray-700 origin-center animate-scaleIn"
                    >
                      <div
                        name={"block"}
                        key={index}
                        id={colorName}
                        className={`relative flex justify-center items-center w-16 h-16 rounded-lg border-gray-300 shadow-lg animate-scaleIn origin-center mx-auto ${textColor}`}
                        style={{ background: shade.hex }}
                        // onMouseEnter={(e) => {
                        //   handleBlockMouseEnter(e);
                        // }}
                        // onMouseLeave={(e) => {
                        //   handleBlockMouseLeave(e);
                        // }}
                        value={colorName}
                      >
                        {shade.value}
                      </div>
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
