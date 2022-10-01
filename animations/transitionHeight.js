export const transitionHeight = (element, growElement) => {
  //   let isHidden;
  //   if (growElement === false ) {
  //     isHidden = false;
  //   } else if (growElement === true ) {
  //     isHidden = true;
  //   } else {
  //     return;
  //   }
  setTimeout(() => {
    if (growElement === true && element?.classList.contains("flex-0")) {
      console.log("flex-0 to flex-1");
      element?.classList.remove("flex-0");
      return element?.classList.add("flex-1");
    }
    if (growElement === false && element?.classList.contains("flex-1")) {
      console.log("flex-1 to flex-0");

      element?.classList.remove("flex-1");
      return element?.classList.add("flex-0");
    }
  }, 200);
};
