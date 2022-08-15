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
    <button
      className={`h-12 flex border-2 border-black justify-center items-center rounded-lg shadow-lg transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow hover:duration-150 hover:ease-in-out ${
        className ? className : "w-full sm:w-8/12 "
      } `}
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
      {backgroundColor && (
        <span
          className={`flex whitespace-nowrap  ${
            backgroundColor ? "text-opacity-100" : "text-opacity-0"
          }`}
        >
          {text} <MdAdd className="ml-2 w-6 h-6" />
        </span>
      )}
    </button>
  );
};

export default ColorPreviewButton;
