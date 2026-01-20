
import { playListSelect } from "./modules/playlist.ts";

import { selectTrackButton } from "./modules/audio.ts";

import { inputSearch } from "./modules/search.ts";

window.onload = function (): void {
  let containerEl: HTMLElement = document.getElementById(
    "table",
  ) as HTMLElement;
  setTimeout(() => selectTrackButton(), 50);
  playListSelect(containerEl);
  inputSearch();
};
