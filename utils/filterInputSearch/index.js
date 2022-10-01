import { setElementVisibility } from "../setElementVisibility";
export const filterInputSearch = (value, listElement) => {
  let found = false;
  const buttons = Array.from(listElement?.querySelectorAll("button"));
  if (value.length > 1) {
    setElementVisibility(listElement).showElement();
  }
  buttons.map((button) => {
    if (button.innerText.toLowerCase() === value.toLowerCase()) {
      found = true;
    }
    if (
      button.innerText.toLowerCase().includes(value.toLowerCase()) &&
      value.length > 1
    ) {
      if (value.includes("-")) {
        return;
      }
      button.classList.remove("hidden");
    } else {
      button.classList.add("hidden");
    }
  });

  if (found && value.split("-")[1] !== "50") {
    setElementVisibility(listElement).hideElement();
  }

  if (!value) {
    setElementVisibility(listElement).hideElement();
  }
  return found;
};
