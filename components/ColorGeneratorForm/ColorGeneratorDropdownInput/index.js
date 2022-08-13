import { useState, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const ColorGeneratorDropdownInput = ({
  index,
  placeholder,
  isDisabled,
  data,
  setSecondaryData,
}) => {
  const handleDropdownClick = (e, index) => {
    const dropdownList = document.querySelector(`#dropdownList-${index}`);

    const dropdownLists = Array.from(
      document.querySelectorAll(".dropdownList")
    );

    dropdownLists.map((list, listIndex) => {
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
    e.preventDefault();
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
          //   value={isDisabled ? "" : value}
          //   onChange={(e) => {
          //     handleInputChange(() => {
          //       const value = e.target.value;
          //       return { value, index };
          //     });
          //   }}
          disabled={isDisabled}
          //   style={rgb && { backgroundColor: rgb }}
        />
        <button
          className="absolute inset-y-1 right-4"
          onClick={(e) => {
            handleDropdownClick(e, index);
          }}
          disabled={isDisabled}
        >
          <AiFillCaretDown
            id={`dropdownIcon-${index}`}
            className="w-4 h-4 transform"
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
        setSecondaryData={setSecondaryData}
      />
    </div>
  );
};

const DropdownList = ({ data, index, setSecondaryData }) => {
  const handleItemClick = (e, index) => {
    e.preventDefault();
    const input = document.querySelector(`#input-${index}`);
    const dropdownList = document.querySelector(`#dropdownList-${index}`);
    input.value = e.target.innerText;
    dropdownList.classList.add("hidden");

    // If the first input has data, pass new array with filtered data to the second input
    if (index === 0) {
      const colorPrefix = e.target.innerText.split("-")[0];
      const colorSuffix = e.target.innerText.split("-")[1];

      const listData = [
        ...data.filter((color) => color.colorPrefix === colorPrefix),
      ];

      const shades = listData[0]?.shades;

      const renderedColorsArr = [];

      // If the value of the shade matches the first input value, don't add it to the secondary array
      shades?.map((shade) => {
        if (shade?.value === colorSuffix) {
          return;
        }
        renderedColorsArr.push(shade);
      });

      // Creating a new list object with the filtered data, removing the current color selected from the first input. This copy ensures the data list isn't mutated and the secondary list shows the correct data.
      const renderedColorsList = [
        { colorPrefix, shades: [...renderedColorsArr] },
      ];
      setSecondaryData(() => {
        return renderedColorsList;
      });
    }
  };

  return (
    <ul
      id={`dropdownList-${index}`}
      className={`dropdownList 
        flex-col scroll w-full z-50 hidden ${
          index === 0 ? "h-auto" : "h-auto"
        }`}
      // ref={ref}
    >
      {data &&
        data.map((item, dataIndex) =>
          item.shades.map((shade, shadeIndex) => {
            const tailwindName = item.colorPrefix + "-" + shade.value;

            return (
              <li key={"btn-" + item.colorPrefix + "-" + shadeIndex}>
                <button
                  className="flex justify-between text-gray-500 w-full pl-4 pr-1 py-3 items-center border-b border-b-gray-200 hover:cursor-pointer hover:text-gray-400  hover:bg-amber-50 hover:shadow-inner"
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
  );
};

export default ColorGeneratorDropdownInput;
