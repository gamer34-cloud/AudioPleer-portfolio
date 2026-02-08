import { getTracks, getFavoriteTracks } from "../server/getData.ts";
import { el } from "redom";
import { render } from "./renderTracks.ts";
import { field, track } from "./typesAndInterfeis.ts";
import { getLoader } from "./usefullFunctions.ts";

const stub: field = {
  text: "",
  index: 0,
};

const loader: HTMLElement = getLoader() as unknown as HTMLElement;

export function pagination(
  start: number = 0,
  end: number = 6,
  playlist: "fav" | "base",
  search = stub,
): void {
  let counter: number = 0;
  let numberForButtons: number = 0;

  const containerEl: HTMLElement = document.getElementById(
    "tracks",
  ) as HTMLElement;
  const paginationEl: HTMLDivElement = document.querySelector(
    ".pagination",
  ) as HTMLDivElement;
  containerEl.innerHTML = "";
  paginationEl.innerHTML = "<ul class='pagination__list'></ul>";

  const ulEl: HTMLUListElement = document.querySelector(
    ".pagination__list",
  ) as HTMLUListElement;

  if (playlist != "fav") {
    getTracks().then((tracks) => {
      if (
        search.text != undefined &&
        search.text != null &&
        search.text != ""
      ) {
        tracks = tracks.filter(
          (a: track) => a.title.slice(0, search.index) == search.text,
        );
      }
      const newTracks = tracks.slice(start, end);

      tracks.forEach((elem, index) => {
        counter++;
        if (counter == 6 || index == 0) {
          counter = 0;
          numberForButtons++;
          ulEl.append(
            el("button", { class: "pagination__button" }, numberForButtons),
          );
        }
      });

      render(containerEl, newTracks, playlist);
      paginationButtons(playlist);
    });
  } else {
    //Отрисовка лайкнутых треков

    getFavoriteTracks().then((tracks) => {
      document.body.append(loader);
      if (
        search.text != undefined &&
        search.text != null &&
        search.text != ""
      ) {
        tracks = tracks.filter(
          (a: track) => a.title.slice(0, search.index) == search.text,
        );
      }
      const newTracks = tracks.slice(start, end);

      tracks.forEach((elem, index) => {
        counter++;
        if (counter == 6 || index == 0) {
          counter = 0;
          numberForButtons++;
          ulEl.append(
            el("button", { class: "pagination__button" }, numberForButtons),
          );
        }
      });

      render(containerEl, newTracks, playlist);
      paginationButtons(playlist);
      setTimeout(() => {
        loader.remove();
      }, 500);
    });
  }
}

export function paginationButtons(playlist: "fav" | "base"): void {
  const buttons: HTMLButtonElement[] = document.querySelectorAll(
    ".pagination__button",
  ) as unknown as HTMLButtonElement[];

  buttons.forEach((elem, index) => {
    elem.addEventListener("click", function (e) {
      document.body.append(loader);

      for (let i of buttons) {
        i.classList.remove("pagination__button--active");
      }

      const count = index + 1;
      if (index > 0) {
        const start = count * 6 - 6;
        pagination(start, count * 6, playlist);
      } else {
        pagination(0, 6, playlist);
      }
      setTimeout(() => {
        loader.remove();
      }, 500);
      elem.classList.add("pagination__button--active");
    });
  });
}
