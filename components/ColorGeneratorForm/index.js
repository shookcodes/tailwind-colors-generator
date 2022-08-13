import { useState } from "react";
import ColorGeneratorDropdownInput from "./ColorGeneratorDropdownInput";
import { tailwindColors } from "../../data/tailwindColors";

const defaultTailwindColors = tailwindColors();
const ColorGeneratorForm = () => {
  const handleSubmit = () => {
    return;
  };

  const [secondaryData, setSecondaryData] = useState([]);

  return (
    <form className="h-full w-full" onSubmit={handleSubmit}>
      <fieldset className="flex w-full flex-col items-center">
        <div className=" flex justify-center relative w-full ">
          <ColorGeneratorDropdownInput
            index={0}
            placeholder="Search for a color"
            isDisabled={false}
            data={defaultTailwindColors}
            setSecondaryData={setSecondaryData}
          />
          <ColorGeneratorDropdownInput
            index={1}
            placeholder="Search for a color"
            isDisabled={secondaryData.length > 0 ? false : true}
            data={secondaryData}
          />

          {/* <DropdownTwoCol
        arr={arr}
        setPrimaryHex={setPrimaryHex}
        setSecondaryHex={setSecondaryHex}
        setPrimaryTwColor={setPrimaryTwColor}
        setSecondaryTwColor={setSecondaryTwColor}
      /> */}
        </div>
      </fieldset>
    </form>
  );
};

export default ColorGeneratorForm;
