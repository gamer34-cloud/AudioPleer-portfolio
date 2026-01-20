import render from "./renderTracks.ts";

import { getFavoriteTracks } from "../server/getData.ts";

import { getTracks } from "../server/getData.ts";

interface track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  encoded_audio: string;
}

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

        getTracks().then((res: track[]) => {
          render(containerEL, res, '');
        });

      } else if (buttonMain[0].classList.contains("is-active")) {

        getFavoriteTracks().then((res) => {
          render(containerEL, res, '');
        });

      }

    });
  });

  getTracks().then((res: track[]) => {
    render(containerEL, res, '');
  });
}
