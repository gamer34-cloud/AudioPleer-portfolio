import render from "./renderTracks.ts";

export function playListSelect(containerEL: HTMLElement) {
  const buttonMain: HTMLButtonElement[] = document.querySelectorAll(
    ".aside__button"
  ) as unknown as HTMLButtonElement[];
  buttonMain[1].classList.add("is-active");

  if (buttonMain[1].classList.contains("is-active")) {
    render(containerEL);
  } else if (buttonMain[0].classList.contains("is-active")) {
    render(containerEL);
  }
}
