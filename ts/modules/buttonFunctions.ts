import { el } from "redom";

import { getTracks } from "../server/getData.ts";

import { postFavorites } from "../server/postData.ts";

import { deleteFavorites } from "../server/deleteData.ts";

export function buttonLike(): void {
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".like",
  ) as unknown as HTMLButtonElement[];

  getTracks().then((res) => {
    buttonEl.forEach((elem) => {
      elem.addEventListener("click", function (e) {
        const username = localStorage.getItem("username") || null;
        if (username != null) {
          elem.classList.toggle("liked");

          let middleId = elem.id.split("");
          middleId = middleId
            .map((str) => parseInt(str))
            .filter((num) => !isNaN(num)) as unknown as string[];
          middleId = middleId.join("") as unknown as string[];

          const normalId = Number(middleId) - 1;

          if (elem.classList.contains("liked")) {
            postFavorites(res[normalId as unknown as number].id);
          } else {
            deleteFavorites(res[normalId as unknown as number].id);
          }

        } else {
          
        }
      });
    });
  });
}

export function modalWindowButton(): void {
  const buttonEl: HTMLButtonElement = document.querySelector(
    ".hero__header-button",
  ) as HTMLButtonElement;

  buttonEl.addEventListener("click", function (e) {
    const overlayEl: HTMLDivElement | undefined | null = document.querySelector(
      ".overlay",
    ) as HTMLDivElement;
    const wrapperEl: HTMLDivElement | undefined | null = document.querySelector(
      ".modal-window",
    ) as HTMLDivElement;

    if (!overlayEl && !wrapperEl) {
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
            { class: "modal-window__button", href: "./authorization.html" },
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
      const main: HTMLElement = document.querySelector(".main") as HTMLElement;
      main.append(overlay, wrapper);
    } else {
      overlayEl.style.display = "flex";
      wrapperEl.style.display = "flex";
    }
  });
}

export function buttonOption(): void {
  const buttonOption: HTMLButtonElement[] = document.querySelectorAll(
    ".table__option",
  ) as unknown as HTMLButtonElement[];

  const optionCardEl: HTMLDivElement[] = document.querySelectorAll(
    ".option-card",
  ) as unknown as HTMLDivElement[];

  buttonOption.forEach((elem, index) => {
    elem.addEventListener("click", function (e) {
      optionCardEl[index].classList.toggle("option-card--active");
    });
  });
}
