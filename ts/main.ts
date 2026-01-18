import {
  buttonLike,
  buttonAside,
  modalWindowButton,
  buttonOption,
} from "./modules/buttonFunctions.ts";

import render from "./modules/renderTracks.ts";

import { playListSelect } from "./modules/playlist.ts";

window.onload = function (): void {
  let containerEl: HTMLElement = document.getElementById(
    "table"
  ) as HTMLElement;
  render(containerEl) as unknown as HTMLElement;
  setTimeout(() => buttonLike(), 50);
  buttonAside();
  modalWindowButton();
    setTimeout(() => buttonOption(), 50);
    playListSelect(containerEl)
};
