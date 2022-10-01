export const setElementVisibility = (element, elementHeight) => {
  const elWithParent =
    element.tagName.toLowerCase() === "ul" ? element.parentNode : element;
  const height = !elementHeight ? "h-128" : elementHeight;
  const showClasses = ["translate-y-4", "shadow-xl", "opacity-100", "z-50"];
  const hideClasses = ["-translate-y-full", "shadow-none", "opacity-0", "z-10"];
  const index = element.id.split("-")[1];
  const dropdownIcon = document?.getElementById(`dropdownIcon-${index}`);

  const buttons = Array.from(element.querySelectorAll("button"));

  const hideElement = () => {
    dropdownIcon && dropdownIcon.classList.remove("-scale-100");
    element.classList.add(...hideClasses);
    element.classList.remove(...showClasses);

    setTimeout(() => {
      element.parentNode.classList.remove(elementHeight);
      element.parentNode.classList.add("h-0");
    }, 200);
  };

  const showElement = (setListIndexCallback) => {
    buttons.map((button) => {
      button.classList.remove("hidden");
    });
    dropdownIcon && dropdownIcon.classList.add("-scale-100");
    element.parentNode.classList.remove("h-0");
    element.parentNode.classList.add(height);
    element.classList.remove(...hideClasses);
    element.classList.add(...showClasses);

    if (setListIndexCallback) {
      return setListIndexCallback(() => {
        return index;
      });
    }
  };

  return { hideElement, showElement };
};
