export const setDropdownVisibility = (list) => {
  const showClasses = ["translate-y-4", "h-auto", "shadow-xl"];
  const hideClasses = ["-translate-y-full", "h-0", "shadow-none"];

  const hideList = () => {
    return (
      list.classList.add(...hideClasses) &&
      list.classList.remove(...showClasses)
    );
  };

  const showList = () => {
    return (
      list.classList.remove(...hideClasses) &&
      list.classList.add(...showClasses)
    );
  };

  return { hideList, showList };
};
