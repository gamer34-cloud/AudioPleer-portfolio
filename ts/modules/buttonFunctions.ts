import { el, setChildren } from "redom";

export function buttonLike(): void {
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".like"
  ) as unknown as HTMLButtonElement[];

  buttonEl.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      elem.classList.toggle("liked");
    });
  });
}

export function buttonAside(): void {
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".aside__button"
  ) as unknown as HTMLButtonElement[];

  buttonEl.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      for (let i = 0; i < buttonEl.length; i++) {
        buttonEl[i].classList.remove("is-active");
      }
      elem.classList.toggle("is-active");
    });
  });
}

export function modalWindowButton(): void {
  const buttonEl: HTMLButtonElement = document.querySelector(
    ".hero__header-button"
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
        "Закрыть"
      ),
      el("div", { class: "modal-window__buttons" }, [
        el(
          "a",
          { class: "modal-window__button", href: "./enter.html" },
          "Войти"
        ),
        el(
          "a",
          {
            class: "modal-window__button-sign",
            href: "./registration.html",
          },
          "Зарегестрироваться"
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
    ".table__option"
  ) as unknown as HTMLButtonElement[];

  const optionCardEl: HTMLDivElement[] = document.querySelectorAll('.option-card') as unknown as HTMLDivElement[];

  buttonEl.forEach((elem, index) => {
    elem.addEventListener("click", function (e) {
      optionCardEl[index].classList.toggle('option-card--active');
    });
  });
}
