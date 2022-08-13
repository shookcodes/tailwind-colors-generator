import { useState, useEffect } from "react";
import InputWithDropdown from "./InputWithDropdown";
import { tailwindColors } from "../../data/tailwindColors";
import { convertFromHex } from "../../utils/convertHex";
import { generateMedianRGB } from "../../utils/generateMedianRGB";
const defaultTailwindColors = tailwindColors();
const ColorGeneratorForm = () => {
  const handleSubmit = () => {
    return;
  };

  const [secondaryData, setSecondaryData] = useState([]);
  const [primaryInputData, setPrimaryInputData] = useState(null);
  const [secondaryInputData, setSecondaryInputData] = useState(null);

  useEffect(() => {
    if (primaryInputData !== null && secondaryInputData !== null) {
      const primaryRGB = convertFromHex(primaryInputData.shades[0].hex);
      const secondaryRGB = convertFromHex(secondaryInputData?.shades[0].hex);

      const generatedRBG = generateMedianRGB(primaryRGB, secondaryRGB);
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
