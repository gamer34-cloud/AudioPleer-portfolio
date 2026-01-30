import { getFavoriteTracks } from "../server/getData.ts";

import { pagination } from "./pagination.ts";

export function playListSelect(containerEL: HTMLElement) {
  const buttonMain: HTMLButtonElement[] = document.querySelectorAll(
    ".aside__button",
  ) as unknown as HTMLButtonElement[];
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".aside__button",
  ) as unknown as HTMLButtonElement[];

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
          pagination(0, 6, "fav");

          //Отрисовка заливки у сердечек когда выбираеться плейлист с избраными

          setTimeout(() => {
            const buttonLikeEl: HTMLButtonElement[] = document.querySelectorAll(
              ".like",
            ) as unknown as HTMLButtonElement[];

            buttonLikeEl.forEach((like) => {
              like.classList.add("liked");
            });
            
          }, 50);
        });
      }
    });
  });

  pagination(0, 6, "base");
}
