import { useContext } from "react";
// import { updateColorsPalette } from "../../data/colorsObject/index";
import { convertToHex } from "../../utils";
import { MdAdd } from "react-icons/md";
const ColorPreviewButton = ({
  className,
  text,
  backgroundColor,
  setCurrentPaletteColor,
}) => {
  // const context = useContext(ColorContext);

  // Set the color object and pass it to the parent form component for data handling
  const handleAddColorClick = (e) => {
    e.preventDefault();
    const obj = {
      colorPrefix: text.split("-")[0],
      shade: {
        value: text.split("-")[1],
        hex: convertToHex(backgroundColor),
        rgb: backgroundColor,
      },
    };

    setCurrentPaletteColor(() => {
      return obj;
    });
  };

  return (
    // If className is passed, let className value specify the width of the button, otherwise return default width values
    <div
      className={`h-12 rounded-lg drop-shadow-lg  ${
        className ? className : "w-full sm:w-8/12 "
      }}`}
    >
      <button
        className={`flex w-full rounded-lg h-full justify-center items-center  transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow  duration-150 ease-in-out  `}
        style={{
          backgroundColor: backgroundColor,
        }}
        title="Add color to palette"
        type="submit"
        value={text}
        onClick={(e) => {
          handleAddColorClick(e);
        }}
      >
        <span
          className={`flex text-black transform delay-100 transition ease-in-out whitespace-nowrap ${
            backgroundColor ? "w-100 opacity-1 " : "w-0 opacity-0 "
          }`}
        >
          {text} <MdAdd className="ml-2 w-6 h-6" />
        </span>
      </button>
    </div>
  );
};

export default ColorPreviewButton;
