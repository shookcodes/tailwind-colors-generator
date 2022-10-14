import { createContext, useReducer } from "react";
import colors from "./reducers/colors";
import colorsPalette from "./reducers/colorsPalette";
import { colorsObject } from "../data/colorsObject";
const ColorsContext = createContext([]);

// combine reducer function
const combinedReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

const Provider = ({ children }) => {
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

  const [state, dispatch] = useReducer(
    combinedReducers(colors, colorsPalette),
    colorsObject
  ); // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch, data };
  return (
    <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
  );
};

export { Provider, ColorsContext };
