import { pagination } from "./pagination.ts";
import { getTracks } from "../server/getData";
import { field } from "./typesAndInterfeis.ts";

export function inputSearch(containerEl: HTMLElement): void {
  const input: HTMLInputElement = document.querySelector(
    "#input-search",
  ) as HTMLInputElement;
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".aside__button",
  ) as unknown as HTMLButtonElement[];

  input.addEventListener("input", function (e) {
    getTracks().then((res) => {
      const field: field = {
        text: input.value,
        index: input.value.length,
      };
      if (buttonEl[0].classList.contains("is-active")) {
        pagination(0, 6, "fav", field);
      } else {
        pagination(0, 6, "base", field);
      }
    });
  });
}
