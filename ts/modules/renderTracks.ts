import { el, setChildren, svg } from "redom";
import init from "./userNameInit";
import {
  buttonLike,
  modalWindowButton,
  buttonOption,
} from "./buttonFunctions.ts";

interface track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}

interface field {
  text: string;
  index: number;
}

export default async function render(
  containerEl: HTMLElement,
  tracks: track[],
  parasm: field,
): Promise<void> {
  containerEl.innerHTML = "";

  if (parasm.text != undefined && parasm.text != null && parasm.text != '') {
    tracks = tracks.filter((a: track) => a.title.slice(0, parasm.index) == parasm.text);
  }

  let counter: number = 0;
  const table = el("table", { id: "table" }, [
    tracks.map((elem, index) => {
      counter++;
      if (counter <= 6) {
        return el("tr", [
          el("td", index + 1),

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
              el(
                "span",
                { class: "table__date-text" },
                `${elem.id} дней назад`,
              ),

              el(
                "button",
                {
                  className: ["table__date-like"],
                  class: ["like"],
                  ariaLabel: "Кнопка добавить в избранное",
                  type: "button",
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
                el("button", { class: "option-card__button" }, "Удалить"),
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
      }
    }),
  ]);

  setChildren(containerEl, [table]);
  setTimeout(() => buttonLike(), 50);
  modalWindowButton();
  setTimeout(() => buttonOption(), 50);
  init();
}
function a(value: track, index: number, array: track[]): value is track {
  throw new Error("Function not implemented.");
}
