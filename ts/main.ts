import {
  buttonLike,
  buttonAside,
  modalWindowButton,
} from "./modules/buttonFunctions.ts";

import render from "./modules/renderTracks.ts";

window.onload = function (): void {
let containerEl: HTMLElement = document.getElementById('table') as HTMLElement
  render(containerEl) as unknown as HTMLElement;
setTimeout(()=> buttonLike(), 50)
  buttonAside();
  modalWindowButton();
};
