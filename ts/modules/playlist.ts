import { getFavoriteTracks } from "../server/getData.ts";
import { pagination } from "./pagination.ts";
import { el, setChildren } from "redom";

export function playListSelect(containerEL: HTMLElement) {
  const buttonMain: HTMLButtonElement[] = document.querySelectorAll(
    ".aside__button",
  ) as unknown as HTMLButtonElement[];
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".aside__button",
  ) as unknown as HTMLButtonElement[];
  let containerEl: HTMLElement = document.getElementById(
    "tracks",
  ) as HTMLElement;
  const paginationEl: HTMLDivElement = document.querySelector(
    ".pagination",
  ) as HTMLDivElement;

  buttonMain[1].classList.add("is-active");

  buttonEl.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      for (let i = 0; i < buttonEl.length; i++) {
        buttonEl[i].classList.remove("is-active");
      }

      elem.classList.toggle("is-active");

      if (buttonMain[1].classList.contains("is-active")) {
        pagination(0, 6, "base");
      } else if (buttonMain[0].classList.contains("is-active")) {
        getFavoriteTracks().then((res) => {
          try {
            if (res.length > 0) {
              pagination(0, 6, "fav");
            } else {
              const err = new Error("войдите или добавте песню в избранные");
              err.name = "Authorization";
              throw err;
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              paginationEl.innerHTML = "";
              setChildren(containerEl, [
                el("div", { class: "error" }, [
                  el("h2", { class: "error__title" }, error.message),
                ]),
              ]);
            }
          }
        });
      }
    });
  });

  pagination(0, 6, "base");
}
