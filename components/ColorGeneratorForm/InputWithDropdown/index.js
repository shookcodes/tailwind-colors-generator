import { useState, useEffect } from "react";
import DropdownList from "./DropdownList";
import {
  filterInputSearch,
  generateListData,
  setDropdownVisibility,
} from "../../../utils";
import { AiFillCaretDown } from "react-icons/ai";

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
  const [openDropdownIndex, setOpenDropdownIndex] = useState("");
  const [currentInputIndex, setCurrentInputIndex] = useState("");

  const handleDropdownVisibility = ({ hideAll, hideOther, toggle }) => {
    const dropdownLists = Array.from(
      document.querySelectorAll(".dropdownList")
    );

    dropdownLists.map((list, listIndex) => {
      if (hideAll) {
        setDropdownVisibility(list).hideList();
        return;
      }

      if (toggle && index === listIndex) {
        if (list.classList.contains("-translate-y-full")) {
          // Show the list and return/set the current index of the open dropdown.
          setDropdownVisibility(list).showList(setOpenDropdownIndex);
        } else {
          setDropdownVisibility(list).hideList();
        }
      } else {
        setDropdownVisibility(list).hideList();
      }

      if (hideOther && index !== listIndex) {
        setDropdownVisibility(list).hideList();
      }
    });
  };

  const handleDropdownClick = (e) => {
    handleDropdownVisibility({ toggle: true });
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const index = parseInt(e.target.id.split("-")[1]);
    const dropdownList = document.querySelector(`#dropdownList-${index}`);
    const matchFound = filterInputSearch(e.target.value, dropdownList);

    console.log("MATCH", matchFound);
    // If an input target doesn't have a value, set the data passed to the parent to null and set the value to null so the hex preview icon is not visible
    if (!e.target.value) {
      // If the first input value is null, remove the value from the second input if it is not null and clear the input data passed to the parent
      if (index === 0) {
        handleDropdownVisibility({ hideAll: true });
        document.querySelector("#dropdownInput-1").value = "";
      }
      setInputData(null);
    }
    if (matchFound) {
      const generatedData = generateListData(e, data, index);

      if (index === 0) {
        // Generate the rendered list for the second drop-down if a valid match is found
        setFilteredTailwindColors({ ...data, primaryList: generatedData });
      }
      if (index === 1) {
        setFilteredTailwindColors({
          ...data,
          secondaryList: generatedData,
        });
      }
    }
  };

  const handleInputFocus = (index) => {
    setCurrentInputIndex(() => {
      return index;
    });
    // If input is focused, hide other list if it is open.
    handleDropdownVisibility({ hideOther: true });
  };

  // Remove text from input fields
  useEffect(() => {
    if (inputData === null) {
      document.querySelector(`#dropdownInput-${index}`).value = "";
    }
  }, [inputData, index]);

  useEffect(() => {
    if (currentInputIndex) {
    }
  }, [currentInputIndex]);

  return (
    <div
      className={`relative w-full h-full bg-inherit ${
        index === 0 ? "z-20" : "z-10"
      }`}
    >
      <label htmlFor={"color" + index} className="relative h-full z-20 ">
        <input
          className={`h-12 py-2 w-full transition-all ease-in-out duration-300 ${
            isDisabled
              ? "placeholder-gray-300 bg-gray-100 shadow-inner drop-shadow"
              : "shadow"
          }`}
          placeholder={placeholder}
          name={"color"}
          type="text"
          id={`dropdownInput-${index}`}
          onChange={(e, index) => {
            handleInputChange(e, index);
          }}
          disabled={isDisabled}
          onFocus={(e) => {
            handleInputFocus(index);
          }}

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
            className={`w-4 h-4 transform  text-gray-600 group-hover:translate-y-0.5 ease-in-out duration-150 ${
              isDisabled ? "text-opacity-20" : "text-opacity-100"
            }`}
          />
        </button>
      </label>

      <DropdownList
        index={index}
        data={data}
        setInputData={setInputData}
        setFilteredTailwindColors={setFilteredTailwindColors}
        setDropdownVisibility={setDropdownVisibility}
        openDropdownIndex={openDropdownIndex}
        setOpenDropdownIndex={setDropdownVisibility}
      />
    </div>
  );
};

export default InputWithDropdown;
