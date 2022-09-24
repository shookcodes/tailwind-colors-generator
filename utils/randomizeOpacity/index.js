export const randomizeOpacity = (listElements, hideElements) => {
  const listItems = Array.from(listElements);
  let isHidden;

  if (hideElements === false || hideElements === "show") {
    isHidden = false;
  } else if (hideElements === true || hideElements === "hide") {
    isHidden = true;
  } else {
    return;
  }

  const randomize = () => {
    listItems.map((listItem) => {
      const random = (Math.random() * 400).toFixed(2);
      setTimeout(() => {
        if (isHidden) {
          listItem.classList?.add("opacity-0");
        } else if (!isHidden) {
          listItem.classList?.remove("opacity-0");
        } else {
          console.log("err", listElements, hideElements);
        }
      }, random);
    });
  };

  return randomize();
};
