import { render } from "./renderTracks.ts";
import { getTracks } from "../server/getData";
import { field } from "./typesAndInterfeis.ts";

export function inputSearch(): void {
  const input: HTMLInputElement = document.querySelector(
    "#input-search",
  ) as HTMLInputElement;

  const containerEl: HTMLElement = document.querySelector(
    "#table",
  ) as HTMLElement;

  input.addEventListener("input", function (e) {
    getTracks().then((res) => {
      const field: field = {
        text: input.value,
        index: input.value.length,
      };
      render(containerEl, res, field);
    });
  });
}
