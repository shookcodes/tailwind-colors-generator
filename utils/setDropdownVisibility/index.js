export const setDropdownVisibility = (list) => {
  const showClasses = ["translate-y-4", "shadow-xl", "opacity-100"];
  const hideClasses = ["-translate-y-full", "shadow-none", "opacity-0"];
  const index = list.id.split("-")[1];
  const dropdownIcon = document.getElementById(`dropdownIcon-${index}`);

  const hideList = () => {
    dropdownIcon.classList.remove("-scale-100");
    return (
      list.classList.add(...hideClasses) &&
      list.classList.remove(...showClasses)
    );
  };

  const showList = () => {
    dropdownIcon.classList.add("-scale-100");
    return (
      list.classList.remove(...hideClasses) &&
      list.classList.add(...showClasses)
    );
  };

  return { hideList, showList };
};
