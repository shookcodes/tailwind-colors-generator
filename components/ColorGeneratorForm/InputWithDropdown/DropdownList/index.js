import { useEffect } from "react";
import { generateListData } from "../../../../utils";

const DropdownList = ({
  data,
  index,
  setInputData,
  setList,
  setDropdownVisibility,
  openDropdownIndex,
}) => {
  const handleItemClick = (e, item, index) => {
    e.preventDefault();

    const input = document.querySelector(`#dropdownInput-${index}`);
    const dropdownList = document.querySelector(`#dropdownList-${index}`);
    input.value = e.currentTarget.innerText;
    setDropdownVisibility(dropdownList).hideList();
    const generatedData = generateListData(e, data, index);
    setInputData(item);
    index !== 2 &&
      setList(() => {
        return generatedData;
      });
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
  }, [index, openDropdownIndex, setDropdownVisibility]);

  return (
    <div
      className="absolute top-8 mt-4 w-full overflow-hidden "
      id={`dropdownListWrapper-${index}`}
    >
      <ul
        id={`dropdownList-${index}`}
        className={` absolute top-0 inset-0 mt-0 
        flex-col scroll w-full h-max z-10 rounded-md shadow-lg opacity-0 transform duration-200 bg-gray-100 transition-all max-h-120 -translate-y-full mx-auto dropdownList border border-gray-200`}
      >
        {data &&
          data.map((item, dataIndex) =>
            item.shades.map((shade, shadeIndex) => {
              const tailwindName = item.colorPrefix + "-" + shade.value;
              const object = {
                colorPrefix: item.colorPrefix,
                shade: { hex: shade.hex, value: shade.value },
              };
              return (
                <li key={"btn-" + item.colorPrefix + "-" + shadeIndex}>
                  <button
                    className="flex justify-between text-gray-500 w-full pl-4 pr-1 py-3 items-center border-b border-b-gray-200 hover:cursor-pointer hover:text-gray-400  hover:bg-amber-50 hover:shadow-inner dropdownListButton group"
                    id={tailwindName}
                    value={tailwindName}
                    onClick={(e) => {
                      e.preventDefault();
                      // Pass the index value of parent component for event handling
                      handleItemClick(e, object, index);
                    }}
                  >
                    <span>{index === 0 ? item.colorPrefix : shade.value}</span>

                    <div
                      className="w-4 h-4 rounded-md border border-gray-300 shadoww-sm shadow group-hover:w-6 group-hover:h-6 transition-all ease-in-out"
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
