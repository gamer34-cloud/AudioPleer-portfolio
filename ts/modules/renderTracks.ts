import { el, setChildren, svg } from "redom";
import init from "./userNameInit";

export default async function render(containerEl: HTMLElement): Promise<void> {
  const token: string = localStorage.getItem("autarisation-token") as string;
  containerEl.innerHTML = ''

  const response = await fetch("http://localhost:8000/api/tracks", {
    headers: {
      Authorization: `${token}`,
    },
  });
  //   const status: Object = response as Object;

  interface track {
    id: string;
    title: string;
    artist: string;
    duration: number;
  }
  const tracks: track[] = await response.json();

  let counter: number = 0;
  const table = el("table", { id: "table" }, [
    tracks.map((elem) => {
      counter++;
      if (counter <= 6) {
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
                  [svg("use", { href: "./images/sprite.svg#icon-play-button" })]
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
                `${elem.id} дней назад`
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
                ]
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
                    [svg("use", { href: "/images/sprite.svg#icon-option" })]
                  ),
                ]
              ),
            ]),
          ]),
        ]);
      }
    }),
  ]);

  setChildren(containerEl, [table]);
  init();
}
