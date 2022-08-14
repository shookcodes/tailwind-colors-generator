import { createContext } from "react";

const ColorPaletteContext = createContext([]);

const ColorPaletteProvider = ({ children }) => {
  const data = async () => {
    const promise = new Promise((resolve, reject) => {
      const localData = localStorage.getItem("colorPalette");
      if (localData !== null) {
        resolve(localData);
      } else {
        return;
      }
    });

    const result = await promise;

    return result;
  };
  return (
    <ColorPaletteContext.Provider value={data}>
      {children}
    </ColorPaletteContext.Provider>
  );
};

export { ColorPaletteProvider, ColorPaletteContext };
