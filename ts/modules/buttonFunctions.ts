import { el, svg } from "redom";

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
  const overlayEl: HTMLDivElement = document.querySelector(
    ".overlay",
  ) as HTMLDivElement;
  const buttonEl: HTMLButtonElement = document.querySelector(
    ".hero__header-button",
  ) as HTMLButtonElement;

  buttonEl.addEventListener("click", function (e) {
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
        el(
          "button",
          {
            class: "modal-window__account",
            ariaLabel: "Кнопка для изменения профиля",
            // onclick: modalWindowClose,
          },
          "Профиль",
        ),
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

    buttonAccount();
  });
}

export function buttonAccount() {
  const overlayEl: HTMLDivElement = document.querySelector(
    ".overlay",
  ) as HTMLDivElement;
  const buttonAccount: HTMLButtonElement = document.querySelector(
    ".modal-window__account",
  ) as unknown as HTMLButtonElement;
  const wrapperEl: HTMLDivElement | undefined | null = document.querySelector(
    ".modal-window",
  ) as HTMLDivElement;

  buttonAccount.addEventListener("click", function (e) {
    wrapperEl.style.display = "none";

    const account = el("div", { class: "account" }, [
      el("div", { class: "account__top" }, [
        svg("svg", { class: "account__top-icon" }, [
          svg("use", { href: "../../images/sprite.svg#icon-account-stub" }),
        ]),
        el("div", { class: "account__buttons" }, [
          el("button", { class: "account__buttons-change" }, "Изменить фото"),
          el("button", { class: "account__buttons-close" }, "Закрыть"),
        ]),
        el("input", { class: "account__top-file", id: "file", type: "file" }),
      ]),
      el("form", { class: "account__form" }, [
        el("input", {
          class: "account__form-input",
          id: "name",
          type: "text",
          placeholder: "Введите ваше имя",
        }),
        el(
          "button",
          { class: "account__form-submit", type: "submit" },
          "Изменить",
        ),
      ]),
    ]);

    const main: HTMLElement = document.querySelector(".main") as HTMLElement;
    main.append(overlayEl, account);

    const inputName: HTMLInputElement = document.querySelector(
      "#name",
    ) as HTMLInputElement;

    inputName.value = localStorage.getItem("username") || "User";

    //-------event listeners--------
    const buttonChange: HTMLButtonElement = document.querySelector(
      ".account__buttons-change",
    ) as HTMLButtonElement;
    const buttonClose: HTMLButtonElement = document.querySelector(
      ".account__buttons-close",
    ) as HTMLButtonElement;
    const file: HTMLInputElement = document.querySelector(
      "#file",
    ) as HTMLInputElement;

    const formEl: HTMLButtonElement = document.querySelector(
      ".account__form",
    ) as HTMLButtonElement;

    buttonChange.addEventListener("click", function (e) {
      file.click();
    });

    buttonClose.addEventListener("click", function (e) {
      const overlayEl: HTMLDivElement = document.querySelector(
        ".overlay",
      ) as HTMLDivElement;
      const acc: HTMLDivElement = document.querySelector(
        ".account",
      ) as HTMLDivElement;
      acc.style.display = "none";
      overlayEl.style.display = "none";
    });

    file.addEventListener("change", function (e) {
      const files = file.files;
      if (!files || files.length === 0) return;

      const firstFile = files[0];
      console.log(firstFile);
    });

    formEl.addEventListener("submit", function (e) {
      e.preventDefault();

      localStorage.setItem("username", `${inputName.value}`);
      location.reload();
    });
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
