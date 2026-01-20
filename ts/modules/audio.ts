import { getTracks } from "../server/getData";

export function selectTrackButton(): void {
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".table__artist-button",
  ) as unknown as HTMLButtonElement[];

  const imgPleerEl: HTMLImageElement = document.querySelector(
    ".pleer__album-img",
  ) as HTMLImageElement;

  const titlePleerEl: HTMLSpanElement = document.querySelector(
    ".pleer__artist-song",
  ) as HTMLSpanElement;

  const descriptionPleerEl: HTMLSpanElement = document.querySelector(
    ".pleer__artist-name",
  ) as HTMLSpanElement;

  const durationPleerEL: HTMLSpanElement = document.querySelector(
    ".pleer__bottom-end",
  ) as HTMLSpanElement;

  type song = {
    title: string;
    description: string;
    duration: string;
  };

const lastSongRaw = localStorage.getItem("last-song");

if (lastSongRaw) {
  const dataLastSong: song = JSON.parse(lastSongRaw);

  titlePleerEl.textContent = dataLastSong.title;
  descriptionPleerEl.textContent = dataLastSong.description;
  durationPleerEL.textContent = dataLastSong.duration;
}

  buttonEl.forEach((elem, index) => {
    elem.addEventListener("click", function (e) {
      getTracks().then((res) => {
        titlePleerEl.textContent = res[index].title;
        descriptionPleerEl.textContent = res[index].artist;
        durationPleerEL.textContent = String(res[index].duration);

        const lastSong: song = {
          title: titlePleerEl.textContent,
          description: descriptionPleerEl.textContent,
          duration: durationPleerEL.textContent,
        };
        localStorage.setItem("last-song", JSON.stringify(lastSong));
      });
    });
  });
}
