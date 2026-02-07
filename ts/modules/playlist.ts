import { getFavoriteTracks } from "../server/getData.ts";
import { pagination } from "./pagination.ts";
import { el, setChildren } from "redom";

export function playListSelect(containerEL: HTMLElement) {
  const width: number = window.screen.width as number;

  let buttonMain: HTMLButtonElement[];
  if (width >= 1023) {
    buttonMain = document.querySelectorAll(
      ".aside__button",
    ) as unknown as HTMLButtonElement[];

    buttonMain[1].classList.add("is-active");
  } else {
    buttonMain = document.querySelectorAll(
      ".table__mobale-button",
    ) as unknown as HTMLButtonElement[];

    buttonMain[0].classList.add("is-active");
  }
  let containerEl: HTMLElement = document.getElementById(
    "tracks",
  ) as HTMLElement;
  const paginationEl: HTMLDivElement = document.querySelector(
    ".pagination",
  ) as HTMLDivElement;

  buttonMain.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      for (let i = 0; i < buttonMain.length; i++) {
        buttonMain[i].classList.remove("is-active");
      }

      elem.classList.toggle("is-active");
      let text = elem.textContent.trim();

      if (text == "Аудиокомпозиции" && elem.classList.contains("is-active")) {
        pagination(0, 6, "base");
      } else if (text == "Избранное" && elem.classList.contains("is-active")) {
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
