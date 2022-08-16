import { filterInputSearch, generateSecondaryData } from "../../../utils";
import DropdownList from "./DropdownList";
import { AiFillCaretDown } from "react-icons/ai";
import { useEffect } from "react";
import { setDropdownVisibility } from "../../../utils/setDropdownVisibility";

const InputWithDropdown = ({
  index,
  placeholder,
  isDisabled,
  data,
  setFilteredTailwindColors,
  inputData,
  setInputData,
  colorPreviewHex,
}) => {
  const handleDropdownVisibility = (hideAll) => {
    const dropdownLists = Array.from(
      document.querySelectorAll(".dropdownList")
    );

    return dropdownLists.map((list, listIndex) => {
      if (hideAll) {
        setDropdownVisibility(list).hideList();

        return;
      }

      if (index === listIndex) {
        if (list.classList.contains("-translate-y-full")) {
          setDropdownVisibility(list).showList();
        } else {
          setDropdownVisibility(list).hideList();
        }
      }
      if (listIndex !== index) {
        setDropdownVisibility(list).hideList();
      }
    });
  };

  const handleDropdownClick = (e) => {
    handleDropdownVisibility();
    e.preventDefault();
  };

  // Filter data and return the value of the input's matching object to parent component for data handling
  const setInputValue = (colorValue) => {
    // Filter the object that matches the selected color's prefix
    const currentColor = data.filter(
      (color) => color && color?.colorPrefix === colorValue?.split("-")[0]
    );

    // Filter the shade that matches the selected color's suffix
    const currentShade = currentColor[0].shades?.filter(
      (shade) => parseInt(shade.value) === parseInt(colorValue.split("-")[1])
    );

    // Passing the input data to parent for data handling
    setInputData({
      colorPrefix: currentColor.pop().colorPrefix,
      shade: currentShade.pop(),
    });
  };

  // Remove text from input fields
  useEffect(() => {
    if (inputData === null) {
      document.querySelector(`#input-${index}`).value = "";
    }
  }, [inputData, index]);

  const handleInputChange = (e) => {
    const index = parseInt(e.target.id.split("-")[1]);
    const dropdownList = document.querySelector(`#dropdownList-${index}`);
    const matchFound = filterInputSearch(e.target.value, dropdownList);
    const input = document.querySelector(`#input-${index}`);

    // If an input target doesn't have a value, set the data passed to the parent to null and set the value to null so the hex preview icon is not visible
    if (!e.target.value) {
      // If the first input value is null, remove the value from the second input if it is not null and clear the input data passed to the parent
      if (index === 0) {
        handleDropdownVisibility(true);
        document.querySelector("#input-1").value = "";
      }
      setInputData(null);
    }
    if (matchFound) {
      setInputValue(e.target.value);

      if (index === 0) {
        // Generate the rendered list for the second drop-down if a valid match is found
        const generatedData = generateSecondaryData(e, data);
        setFilteredTailwindColors(generatedData);
      }
    }
  };

  console.log("PREVIEW HEX DD", colorPreviewHex);

  return (
    <div className="relative w-full h-full ">
      <label htmlFor={"color" + index} className="relative h-full z-20 ">
        <input
          className="h-12 py-2 w-full"
          placeholder={placeholder}
          name={"color"}
          type="text"
          id={`input-${index}`}
          onChange={(e, index) => {
            handleInputChange(e, index);
          }}
          disabled={isDisabled}
          //   style={rgb && { backgroundColor: rgb }}
        />
        {colorPreviewHex && (
          <div
            className="absolute w-8 h-8 -top-1.5 right-9 rounded-lg border border-gray-200 shadow-md"
            style={{ backgroundColor: colorPreviewHex }}
          ></div>
        )}
        <button
          className="absolute inset-y-1 right-3 group"
          id={`dropdownToggle-${index}`}
          onClick={(e, index) => {
            handleDropdownClick(e, index);
          }}
          disabled={isDisabled}
        >
          <AiFillCaretDown
            id={`dropdownIcon-${index}`}
            className="w-4 h-4 transform group-hover:translate-y-0.5 ease-in-out duration-150"
            style={
              isDisabled
                ? { fill: "rgb(209 213 219)" }
                : { fill: "rgb(75 85 99)" }
            }
          />
        </button>
      </label>
      <div className="relative w-full h-full ">
        <DropdownList
          index={index}
          data={data}
          setInputValue={setInputValue}
          setFilteredTailwindColors={setFilteredTailwindColors}
          setDropdownVisibility={setDropdownVisibility}
        />
      </div>
    </div>
  );
};

export default InputWithDropdown;
