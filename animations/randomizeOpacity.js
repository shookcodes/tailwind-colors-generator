export const randomizeOpacity = (elements, isVisible, callback) => {
  elements.length > 0 &&
    elements.map((item) => {
      const random = (Math.random() * 400).toFixed(2);
      setTimeout(() => {
        if (isVisible === true) {
          item?.classList?.add("opacity-100", "scale-100");
          item?.classList?.remove("opacity-0", "scale-0", "flex-1");
        } else if (isVisible === false) {
          item?.classList?.add("opacity-0", "scale-0");
          item?.classList?.remove("opacity-100", "scale-100");
        } else {
          console.log("err", elements, showElements);
        }
      }, random);
    });

  return callback;
};
