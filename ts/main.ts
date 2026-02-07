import { playListSelect } from "./modules/playlist.ts";

import { playAndPause } from "./modules/audio.ts";

import { inputSearch } from "./modules/search.ts";

import { checkUser } from "./server/getData.ts";

window.onload = function (): void {
  let containerEl: HTMLElement = document.getElementById(
    "tracks",
  ) as HTMLElement;

  playListSelect(containerEl);
  inputSearch(containerEl);
  playAndPause();

  checkUser();
};
