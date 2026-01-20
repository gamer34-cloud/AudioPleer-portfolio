import { el, setChildren } from "redom";

import { getTracks } from "../server/getData.ts";

import { postFavorites } from "../server/postData.ts";

import { deleteFavorites } from "../server/deleteData.ts";

export function buttonLike(): void {
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".like",
  ) as unknown as HTMLButtonElement[];
  interface track {
    id: string;
    title: string;
    artist: string;
    duration: number;
    encoded_audio: string;
  }
  const tracks: Promise<track[]> = getTracks() as unknown as Promise<track[]>;
  buttonEl.forEach((elem, index) => {
    elem.addEventListener("click", function (e) {
      elem.classList.toggle("liked");
      if (elem.classList.contains("liked")) {
        tracks.then((res) => {
          postFavorites(res[index].id);
        });
      } else {
        tracks.then((res) => {
          deleteFavorites(res[index].id);
        });
      }
    });
  });
}

export function modalWindowButton(): void {
  const buttonEl: HTMLButtonElement = document.querySelector(
    ".hero__header-button",
  ) as HTMLButtonElement;

  buttonEl.addEventListener("click", function (e) {
    const overlay = el("div", { class: "overlay" });
    const wrapper = el("div", { class: "modal-window" }, [
      el(
        "button",
        {
          class: "modal-window__close",
          ariaLabel: "Кнопка закрытия модального окна",
          onclick: modalWindowClose,
        },
        "Закрыть",
      ),
      el("div", { class: "modal-window__buttons" }, [
        el(
          "a",
          { class: "modal-window__button", href: "./enter.html" },
          "Войти",
        ),
        el(
          "a",
          {
            class: "modal-window__button-sign",
            href: "./registration.html",
          },
          "Зарегестрироваться",
        ),
      ]),
    ]);

    function modalWindowClose(): void {
      overlay.style.display = "none";
      wrapper.style.display = "none";
    }
    const main = document.querySelector(".main");
    main?.append(overlay, wrapper);
  });
}

export function buttonOption(): void {
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".table__option",
  ) as unknown as HTMLButtonElement[];

  const optionCardEl: HTMLDivElement[] = document.querySelectorAll(
    ".option-card",
  ) as unknown as HTMLDivElement[];

  buttonEl.forEach((elem, index) => {
    elem.addEventListener("click", function (e) {
      optionCardEl[index].classList.toggle("option-card--active");
    });
  });
}
