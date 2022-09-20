export const setDropdownVisibility = (listElement) => {
  const showClasses = ["translate-y-4", "shadow-xl", "opacity-100", "z-50"];
  const hideClasses = ["-translate-y-full", "shadow-none", "opacity-0", "z-10"];
  const index = listElement.id.split("-")[1];
  const dropdownIcon = document.getElementById(`dropdownIcon-${index}`);

  const buttons = Array.from(listElement.querySelectorAll("button"));

  const hideList = () => {
    dropdownIcon.classList.remove("-scale-100");
    listElement.classList.add(...hideClasses);
    listElement.classList.remove(...showClasses);

    setTimeout(() => {
      listElement.parentNode.classList.remove("h-128");
      listElement.parentNode.classList.add("h-0");
    }, 200);
  };

  const showList = (setListIndexCallback) => {
    buttons.map((button) => {
      button.classList.remove("hidden");
    });
    dropdownIcon.classList.add("-scale-100");
    listElement.parentNode.classList.remove("h-0");
    listElement.parentNode.classList.add("h-128");
    listElement.classList.remove(...hideClasses);
    listElement.classList.add(...showClasses);

    if (setListIndexCallback) {
      return setListIndexCallback(() => {
        return index;
      });
    }
  };

  return { hideList, showList };
};
