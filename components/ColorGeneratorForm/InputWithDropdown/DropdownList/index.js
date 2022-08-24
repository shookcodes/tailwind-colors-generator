import { useState, useEffect } from "react";
import { generateSecondaryData } from "../../../../utils";

const DropdownList = ({
  data,
  index,
  setInputValue,
  setFilteredTailwindColors,
  setDropdownVisibility,
  openDropdownIndex,
  setOpenDropdownIndex,
}) => {
  const handleItemClick = (e, index) => {
    e.preventDefault();
    const input = document.querySelector(`#dropdownInput-${index}`);
    const dropdownList = document.querySelector(`#dropdownList-${index}`);
    input.value = e.currentTarget.innerText;

    setDropdownVisibility(dropdownList).hideList();

    setInputValue(e.currentTarget.value);
    // If the first input has data, pass new array with filtered data to the second input
    if (index === 0) {
      const generatedData = generateSecondaryData(e, data);
      setFilteredTailwindColors(generatedData);
      const targetPrefix = e.currentTarget.value.split("-")[0];
      const secondaryInput = document.querySelector("#dropdownInput-1");

      if (targetPrefix !== secondaryInput.value.split("-")[0]) {
        secondaryInput.value = "";
      }
    }
  };

  useEffect(() => {
    const currentInput = document?.querySelector(
      `#dropdownInput-${openDropdownIndex}`
    );
    const handleListButtonKeyUp = (e) => {
      if (
        e.key === "Enter" &&
        e.target.classList.contains("dropdownListButton")
      ) {
        currentInput.focus();
      }
    };
    if (openDropdownIndex) {
      document.addEventListener("keyup", handleListButtonKeyUp);
    }

    return () => {
      document.removeEventListener("keyup", handleListButtonKeyUp);
    };
  }, [openDropdownIndex]);

  return (
    <div
      className="absolute top-8 mt-4 w-full overflow-hidden "
      id={`dropdownListWrapper-${index}`}
    >
      <ul
        id={`dropdownList-${index}`}
        className={` absolute top-0 inset-0 mt-4 
        flex-col scroll w-full h-max z-10 rounded-md shadow-lg opacity-0 transform duration-200 bg-gray-100 transition-all max-h-120 -translate-y-full mx-auto dropdownList`}
      >
        {data &&
          data.map((item, dataIndex) =>
            item.shades.map((shade, shadeIndex) => {
              const tailwindName = item.colorPrefix + "-" + shade.value;

              return (
                <li key={"btn-" + item.colorPrefix + "-" + shadeIndex}>
                  <button
                    className="flex justify-between text-gray-500 w-full pl-4 pr-1 py-3 items-center border-b border-b-gray-200 hover:cursor-pointer hover:text-gray-400  hover:bg-amber-50 hover:shadow-inner dropdownListButton"
                    id={tailwindName}
                    value={tailwindName}
                    onClick={(e) => {
                      e.preventDefault();
                      // Pass the index value of parent component for event handling
                      handleItemClick(e, index);
                    }}
                  >
                    <span>{tailwindName}</span>

                    <div
                      className="w-4 h-4 rounded-md border bg-${color} border-gray-300 shadoww-sm shadow"
                      style={{ backgroundColor: shade.hex }}
                    ></div>
                  </button>
                </li>
              );
            })
          )}
      </ul>
    </div>
  );
};

export default DropdownList;
