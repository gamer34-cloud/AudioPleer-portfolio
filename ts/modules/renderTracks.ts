import { el, setChildren, svg } from "redom";
import init from "./userNameInit";
import {
  buttonLike,
  modalWindowButton,
  buttonOption,
} from "./buttonFunctions.ts";
import { track } from "./typesAndInterfeis.ts";
import { selectTrackButton, buttonTrackChange } from "./audio.ts";

export async function render(
  containerEl: HTMLElement,
  tracks: track[],
  playlist: "fav" | "base",
): Promise<void> {
  containerEl.innerHTML = "";

  let counter: number = 0;
  const table = el("table", { id: "table" }, [
    tracks.map((elem, index) => {
      counter++;

      return el("tr", [
        el("td", elem.id),

        el("td", [
          el("div", { class: "table__artist" }, [
            el("button", { class: "table__artist-button" }, [
              el("img", {
                class: "table__artist-img",
                src: "./images/img-oblojca.jpg",
                alt: "Обложка группы Нирваны",
              }),
              svg(
                "svg",
                {
                  class: "table__artist-svg",
                  src: "./images/img-oblojca.jpg",
                  alt: "Обложка группы Нирваны",
                },
                [
                  svg("use", {
                    href: "./images/sprite.svg#icon-play-button",
                  }),
                ],
              ),
            ]),
            el("div", { class: "table__artist-content" }, [
              el("span", { class: "table__artist-album" }, elem.title),
              el("span", { class: "table__artist-song" }, elem.artist),
            ]),
          ]),
        ]),

        el("td", [el("span", { class: "table__album" }, elem.artist)]),

        el("td", [
          el("div", { class: "table__date" }, [
            el("span", { class: "table__date-text" }, `${elem.id} дней назад`),

            el(
              "button",
              {
                className: ["table__date-like"],
                class: [`like`],
                ariaLabel: "Кнопка добавить в избранное",
                type: "button",
                id: `like-${Number(elem.id)}`,
              },
              [
                svg("svg", { class: "table__icon" }, [
                  svg("use", { href: "/images/sprite.svg#icon-like" }),
                ]),
              ],
            ),
          ]),
        ]),

        el("td", [
          el("div", { class: "table__last" }, [
            el("div", { class: "option-card" }, [
              el(
                "span",
                { class: "option-card__text" },
                "Интересная инфомация о треке из бэка",
              ),
            ]),
            el("span", { class: "table__time" }, elem.duration),
            el(
              "button",
              {
                class: "table__option",
                ariaLabel: "Кнопка с опциями",
              },
              [
                svg(
                  "svg",
                  {
                    class: ["table__icon--option"],
                    xmlns: "http://www.w3.org/2000/svg",
                  },
                  [svg("use", { href: "/images/sprite.svg#icon-option" })],
                ),
              ],
            ),
          ]),
        ]),
      ]);
    }),
  ]);

  //ВЫЗОВЫ ВСПОМОГАТЕЛЬНЫХ ФУНКЦИЙ СПЕЦИАЛЬНО ПОСЛЕ РЕНДЕРА
  setChildren(containerEl, [table]);
  init();
  setTimeout(() => buttonLike(), 50);
  modalWindowButton();
  setTimeout(() => selectTrackButton(), 1000);
  buttonTrackChange();
  setTimeout(() => buttonOption(), 50);
  if (playlist == "fav") {
    const buttonLikeEl =
      document.querySelectorAll<HTMLButtonElement>(".table__date-like");

    buttonLikeEl.forEach((element) => {
      element.classList.add("liked");
    });
  }
}
