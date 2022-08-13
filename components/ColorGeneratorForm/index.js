import { useState, useEffect } from "react";
import InputWithDropdown from "./InputWithDropdown";
import { tailwindColors } from "../../data/tailwindColors";

const defaultTailwindColors = tailwindColors();
const ColorGeneratorForm = () => {
  const handleSubmit = () => {
    return;
  };

  const [secondaryData, setSecondaryData] = useState([]);
  const [primaryInputData, setPrimaryInputData] = useState(null);
  const [secondaryInputData, setSecondaryInputData] = useState(null);

  useEffect(() => {
    if (primaryInputData !== null && setSecondaryInputData !== null) {
      console.log("primaryInputData", primaryInputData);
      console.log("secondaryInputData", secondaryInputData);
    }
  }, [primaryInputData, secondaryInputData]);
  return (
    <form className="h-full w-full" onSubmit={handleSubmit}>
      <fieldset className="flex w-full flex-col items-center">
        <div className=" flex justify-center relative w-full ">
          <InputWithDropdown
            index={0}
            placeholder="Search for a color"
            isDisabled={false}
            data={defaultTailwindColors}
            setSecondaryData={setSecondaryData}
            setInputData={setPrimaryInputData}
          />
          <InputWithDropdown
            index={1}
            placeholder="Search for a color"
            isDisabled={secondaryData.length > 0 ? false : true}
            data={secondaryData}
            setInputData={setSecondaryInputData}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default ColorGeneratorForm;
