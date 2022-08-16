export const setDropdownVisibility = (list) => {
  const showClasses = [
    "translate-y-4",
    "shadow-xl",
    "opacity-100",
    "h-auto",
    "z-50",
  ];
  const hideClasses = [
    "-translate-y-full",
    "shadow-none",
    "opacity-0",
    "h-0",
    "z-10",
  ];
  const index = list.id.split("-")[1];
  const dropdownIcon = document.getElementById(`dropdownIcon-${index}`);

  const buttons = Array.from(list.querySelectorAll("button"));
  console.log();
  const listWrapper = list.parentNode;
  const hideList = () => {
    dropdownIcon.classList.remove("-scale-100");
    // listWrapper.classList.add("h-0");
    // listWrapper.classList.remove("h-auto");
    list.classList.add(...hideClasses);
    list.classList.remove(...showClasses);

    buttons.map((button) => {
      button.classList.add("hidden");
    });
  };

  const showList = () => {
    dropdownIcon.classList.add("-scale-100");
    // listWrapper.classList.add("h-auto");
    // listWrapper.classList.remove("h-0");

    list.classList.remove(...hideClasses);
    list.classList.add(...showClasses);
    buttons.map((button) => {
      button.classList.remove("hidden");
    });
  };

  return { hideList, showList };
};
