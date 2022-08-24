export const setDropdownVisibility = (list) => {
  const showClasses = ["translate-y-4", "shadow-xl", "opacity-100", "z-50"];
  const hideClasses = ["-translate-y-full", "shadow-none", "opacity-0", "z-10"];
  const index = list.id.split("-")[1];
  const dropdownIcon = document.getElementById(`dropdownIcon-${index}`);

  const buttons = Array.from(list.querySelectorAll("button"));

  const hideList = () => {
    dropdownIcon.classList.remove("-scale-100");

    list.classList.add(...hideClasses);
    list.classList.remove(...showClasses);

    setTimeout(() => {
      list.parentNode.classList.remove("h-128");
      list.parentNode.classList.add("h-0");
    }, 200);
  };

  const showList = () => {
    dropdownIcon.classList.add("-scale-100");
    list.classList.remove(...hideClasses);
    list.classList.add(...showClasses);

    list.parentNode.classList.remove("h-0");
    list.parentNode.classList.add("h-128");
  };

  return { hideList, showList };
};
