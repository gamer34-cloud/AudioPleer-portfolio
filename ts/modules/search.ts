import { pagination } from "./pagination.ts";
import { getTracks } from "../server/getData";
import { field } from "./typesAndInterfeis.ts";
import { getLoader } from "./usefullFunctions.ts";

export function inputSearch(containerEl: HTMLElement): void {
  const input: HTMLInputElement = document.querySelector(
    "#input-search",
  ) as HTMLInputElement;
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".aside__button",
  ) as unknown as HTMLButtonElement[];

  const loader: HTMLElement = getLoader() as unknown as HTMLElement;

  input.addEventListener("input", function (e) {
    getTracks().then((res) => {
      document.body.append(loader);
      const field: field = {
        text: input.value,
        index: input.value.length,
      };
      setTimeout(() => {
        if (buttonEl[0].classList.contains("is-active")) {
          pagination(0, 6, "fav", field);
        } else {
          pagination(0, 6, "base", field);
        }
        loader.remove();
      }, 500);
    });
  });
}
