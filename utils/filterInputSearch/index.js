import { setListVisibility } from "../../components/ColorGeneratorForm/InputWithDropdown";
export const filterInputSearch = (value, listElement) => {
  let found = false;
  const buttons = Array.from(listElement.querySelectorAll("button"));
  if (value.length > 1) {
    listElement.classList.remove("hidden");
  }
  buttons.map((button) => {
    if (
      button.innerText.toLowerCase().includes(value.toLowerCase()) &&
      value.length > 2
    ) {
      button.classList.remove("hidden");
    } else {
      button.classList.add("hidden");
    }
    if (button.innerText.toLowerCase() === value.toLowerCase()) {
      found = true;
    }
  });

  if (found) {
    buttons.map((button) => {
      button.classList.add("hidden");
    });
  }

  if (!value.length) {
    setListVisibility(listElement).hideList();
    buttons.map((button) => {
      button.classList.remove("hidden");
    });
  }
  return found;
};
