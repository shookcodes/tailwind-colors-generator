import { generateSecondaryData } from "../../../../utils";

const DropdownList = ({
  data,
  index,
  setInputValue,
  setFilteredTailwindColors,
}) => {
  const handleItemClick = (e, index) => {
    e.preventDefault();
    const input = document.querySelector(`#input-${index}`);
    const dropdownList = document.querySelector(`#dropdownList-${index}`);
    input.value = e.target.innerText;
    dropdownList.classList.add("hidden");

    setInputValue(e.target.value);
    // If the first input has data, pass new array with filtered data to the second input
    if (index === 0) {
      const generatedData = generateSecondaryData(e, data);
      setFilteredTailwindColors(generatedData);
      const targetPrefix = e.target.value.split("-")[0];
      const secondaryInput = document.querySelector("#input-1");

      if (targetPrefix !== secondaryInput.value.split("-")[0]) {
        secondaryInput.value = "";
      }
    }
  };

  return (
    // TODO add animations for list openening/closing
    //  transform ease-in-out duration-150
    <ul
      id={`dropdownList-${index}`}
      className={`dropdownList 
        flex-col scroll w-full z-50 hidden h-auto `}
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

export default DropdownList;
