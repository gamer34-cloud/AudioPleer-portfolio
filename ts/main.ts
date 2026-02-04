import { playListSelect } from "./modules/playlist.ts";

import { selectTrackButton, buttonTrackChange } from "./modules/audio.ts";

import { inputSearch } from "./modules/search.ts";

import { checkUser } from "./server/getData.ts";

window.onload = function (): void {
  let containerEl: HTMLElement = document.getElementById(
    "tracks",
  ) as HTMLElement;
  setTimeout(() => selectTrackButton(), 1000);
  playListSelect(containerEl);
  inputSearch(containerEl);
  buttonTrackChange();
  
  checkUser();
};
