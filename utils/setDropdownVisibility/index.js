export const setDropdownVisibility = (list) => {
  const showClasses = ["translate-y-4", "shadow-xl", "opacity-100"];
  const hideClasses = ["-translate-y-full", "shadow-none", "opacity-0"];

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
