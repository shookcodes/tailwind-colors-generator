import SelectionGrid from "../SelectionGrid";
import { generateListData, randomizeOpacity } from "../../../utils";
import { IoMdClose } from "react-icons/io";

const FilterGrids = ({
  defaultFilter,
  useDefaultFilter,
  setUseDefaultFilter,
  filteredTailwindColors,
  setFilteredTailwindColors,
}) => {
  const handleButtonData = async ({ colorObject }, list, isDefault) => {
    if (isDefault === true) {
      setFilteredTailwindColors(defaultFilter);
    } else {
      const listData = await generateShadesListData(colorObject);
      randomizeOpacity(list, true);

      setTimeout(() => {
        setFilteredTailwindColors(() => {
          return listData;
        });
        setUseDefaultFilter(false);
      }, 401);
    }
  };

  const handleCloseButtonClick = () => {
    setUseDefaultFilter(true);
    setFilteredTailwindColors(defaultFilter);
  };
  // Generate the data for the secondary grid
  const generateShadesListData = async (colorObject, listIndex) =>
    generateListData({ ...colorObject });

  return (
    <div className="relative border w-full h-128 p-6 border-gray-200 rounded-md shadow-lg bg-gray-100 max-w-xl">
      {!useDefaultFilter && (
        <button
          onClick={(e) => {
            handleCloseButtonClick();
            // handleButtonData(e);
          }}
          className="absolute z-10 w-7 h-7 top-3 right-3 "
        >
          <IoMdClose className="pointer-events-none" />
        </button>
      )}

      <SelectionGrid
        // key={index}
        index={0}
        data={filteredTailwindColors}
        // visibleListIndex={visibleListIndex}
        // columns="3"
        defaultData={useDefaultFilter}
        handleButtonData={handleButtonData}
        setUseDefaultFilter={setUseDefaultFilter}
        // visibleListIndex={secondaryGridVisible}
      />
    </div>
  );
};

export default FilterGrids;
