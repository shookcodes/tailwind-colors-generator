import { useState, useEffect } from "react";
import { filterInputSearch } from "../../../utils/filterInputSearch";
import { generateSecondaryData } from "../../../utils/generateSecondaryData";
import DropdownList from "./DropdownList";
import { AiFillCaretDown } from "react-icons/ai";

const InputWithDropdown = ({
  index,
  placeholder,
  isDisabled,
  data,
  setSecondaryData,
  setInputData,
}) => {
  const setDropdownVisibility = (hideAll) => {
    const dropdownLists = Array.from(
      document.querySelectorAll(".dropdownList")
    );

    return dropdownLists.map((list, listIndex) => {
      if (hideAll) {
        return list.classList.add("hidden");
      }

      if (index === listIndex) {
        if (list.classList.contains("hidden")) {
          list.classList.remove("hidden");
        } else {
          list.classList.add("hidden");
        }
      }
      if (listIndex !== index) {
        list.classList.add("hidden");
      }
    });
  };
  const handleDropdownClick = (e) => {
    setDropdownVisibility();
    e.preventDefault();
  };

  // Filter data and return the value of the input's matching object to parent component for data handling
  const setInputValue = (colorValue) => {
    // Filter the object that matches the selected color's prefix
    const currentColor = data.filter(
      (color) => color && color.colorPrefix === colorValue.split("-")[0]
    );

    // Filter the shade that matches the selected color's suffix
    const currentShade = currentColor[0].shades.filter(
      (shade) => parseInt(shade.value) === parseInt(colorValue.split("-")[1])
    );

    // Passing the input data to parent for data handling
    setInputData({
      colorPrefix: currentColor[0].colorPrefix,
      shades: currentShade,
    });
  };

  const handleInputChange = (e) => {
    const index = parseInt(e.target.id.split("-")[1]);
    const dropdownList = document.querySelector(`#dropdownList-${index}`);
    const matchFound = filterInputSearch(e.target.value, dropdownList);

    // If the first input value is null, remove the value from the second input if it is not null and clear the input data passed to the parent
    if (index === 0) {
      if (!e.target.value) {
        setDropdownVisibility(true);
        document.querySelector("#input-1").value = "";
        setInputData({});
      }
    }
    if (matchFound) {
      setInputValue(e.target.value);

      if (index === 0) {
        // Generate the rendered list for the second drop-down if a valid match is found
        const generatedData = generateSecondaryData(e, data);
        setSecondaryData(generatedData);
      }
    }
  };

  return (
    <div>
      <label htmlFor={"color" + index} className="relative h-full ">
        <input
          className=" h-12 py-2 w-full"
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
        <button
          className="absolute inset-y-1 right-4 group"
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

      <DropdownList
        index={index}
        data={data}
        setInputValue={setInputValue}
        setSecondaryData={setSecondaryData}
      />
    </div>
  );
};

export default InputWithDropdown;
