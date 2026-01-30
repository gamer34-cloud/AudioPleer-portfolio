import { getTracks } from "../server/getData";
import { getRandomInt } from "./usefullFunctions";
import { song } from "./typesAndInterfeis";

let audio: HTMLAudioElement = new Audio();
let counter = 0;
let volume = 0.5;
const buttonShufleEl: HTMLButtonElement = document.querySelector(
  ".pleer__buttons-shufle",
) as HTMLButtonElement;
const buttonPlayAndPauseEl: HTMLButtonElement = document.querySelector(
  ".pleer__buttons-play",
) as HTMLButtonElement;

startPleer();

export function selectTrackButton(): void {
  const buttonEl: HTMLButtonElement[] = document.querySelectorAll(
    ".table__artist-button",
  ) as unknown as HTMLButtonElement[];
  const titlePleerEl: HTMLSpanElement = document.querySelector(
    ".pleer__artist-song",
  ) as HTMLSpanElement;

  const descriptionPleerEl: HTMLSpanElement = document.querySelector(
    ".pleer__artist-name",
  ) as HTMLSpanElement;

  const durationPleerEL: HTMLSpanElement = document.querySelector(
    ".pleer__bottom-end",
  ) as HTMLSpanElement;

  const lastSongRaw = localStorage.getItem("last-song");

  if (lastSongRaw) {
    const dataLastSong: song = JSON.parse(lastSongRaw);

    titlePleerEl.textContent = dataLastSong.title;
    descriptionPleerEl.textContent = dataLastSong.description;
    durationPleerEL.textContent = dataLastSong.duration;
  }

  buttonEl.forEach((elem, index) => {
    elem.addEventListener("click", function (e) {
      audioPlay(index);
    });
  });
}

function base64ToAudio(base64: string): HTMLAudioElement {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);

  return new Audio(url);
}

export function audioPlay(id: number) {
  const pleerTextEndEl: HTMLSpanElement = document.querySelector(
    ".pleer__bottom-end",
  ) as HTMLSpanElement;

  const titlePleerEl: HTMLSpanElement = document.querySelector(
    ".pleer__artist-song",
  ) as HTMLSpanElement;

  const descriptionPleerEl: HTMLSpanElement = document.querySelector(
    ".pleer__artist-name",
  ) as HTMLSpanElement;

  const durationPleerEL: HTMLSpanElement = document.querySelector(
    ".pleer__bottom-end",
  ) as HTMLSpanElement;

  counter = id;

  getTracks().then((res) => {
    if (audio) {
      audio.pause();
      audio.src = "";
      audio.currentTime = 0;
      audio.load();
    }

    titlePleerEl.textContent = res[counter].title;
    descriptionPleerEl.textContent = res[counter].artist;
    durationPleerEL.textContent = String(res[counter].duration);
    const idData = res[counter].id;

    const lastSong: song = {
      id: idData,
      title: titlePleerEl.textContent,
      description: descriptionPleerEl.textContent,
      duration: String(durationPleerEL.textContent),
    };
    localStorage.setItem("last-song", JSON.stringify(lastSong));

    audio = base64ToAudio(res[counter].encoded_audio);
    pleerTextEndEl.textContent = String(res[counter].duration);
    audio.play();
    audio.volume = volume;
    buttonPlayAndPauseEl.classList.add("pleer__buttons-play--active");
    scrollChange();
    update();
  });
}

function startPleer() {
  volumeChange();
  loop();
  shufle();
  playAndPause();
}

export function buttonTrackChange() {
  const buttonNextSong: HTMLButtonElement = document.querySelector(
    ".pleer__buttons-forward",
  ) as HTMLButtonElement;
  const buttonBackSong: HTMLButtonElement = document.querySelector(
    ".pleer__buttons-back",
  ) as HTMLButtonElement;

  buttonBackSong.addEventListener("click", function (e) {
    const randomNumber = getRandomInt(0, 50);
    if (counter != 0) {
      if (buttonShufleEl.classList.contains("pleer__buttons-shufle--active")) {
        audioPlay(randomNumber);
      }
      counter--;
      audioPlay(counter);
    }
  });

  buttonNextSong.addEventListener("click", function (e) {
    const randomNumber = getRandomInt(0, 50);
    if (buttonShufleEl.classList.contains("pleer__buttons-shufle--active")) {
      audioPlay(randomNumber);
    }
    counter++;
    console.log(counter);
    audioPlay(counter);
  });
}

function loop() {
  const buttonLoopEl: HTMLButtonElement = document.querySelector(
    ".pleer__buttons-repeat",
  ) as HTMLButtonElement;

  buttonLoopEl.addEventListener("click", function (e) {
    if (buttonLoopEl.classList.contains("pleer__buttons-repeat--active")) {
      audio.loop = false;
      buttonLoopEl.classList.remove("pleer__buttons-repeat--active");
    } else {
      audio.loop = true;
      buttonLoopEl.classList.add("pleer__buttons-repeat--active");
    }
  });
}

function shufle() {
  buttonShufleEl.addEventListener("click", function (e) {
    buttonShufleEl.classList.toggle("pleer__buttons-shufle--active");
  });
}

function volumeChange() {
  const inputEl: HTMLInputElement = document.querySelector(
    "#range",
  ) as HTMLInputElement;

  inputEl.addEventListener("input", function (e) {
    volume = Number(inputEl.value) / 100;
    audio.volume = volume;
  });
}

function playAndPause() {
  buttonPlayAndPauseEl.addEventListener("click", function (e) {
    if (
      buttonPlayAndPauseEl.classList.contains("pleer__buttons-play--active") &&
      audio
    ) {
      audio.pause();
      buttonPlayAndPauseEl.classList.remove("pleer__buttons-play--active");
    } else {
      audio.play();
      buttonPlayAndPauseEl.classList.add("pleer__buttons-play--active");
    }
  });
}

function scrollChange() {
  const inputEl: HTMLInputElement = document.querySelector(
    "#scroll",
  ) as HTMLInputElement;

  audio.addEventListener("loadedmetadata", () => {
    inputEl.max = String(Math.floor(audio.duration));

    inputEl.addEventListener("input", function (e) {
      audio.currentTime = Number(inputEl.value);
    });
  });
}

function update() {
  const randomNumber = getRandomInt(0, 50);

  const inputEl: HTMLInputElement = document.querySelector(
    "#scroll",
  ) as HTMLInputElement;

  const pleerTextEl: HTMLSpanElement = document.querySelector(
    ".pleer__bottom-start",
  ) as HTMLSpanElement;

  audio.ontimeupdate = () => {
    inputEl.value = String(audio.currentTime);

    if (audio.currentTime >= audio.duration) {
      if (buttonShufleEl.classList.contains("pleer__buttons-shufle--active")) {
        audioPlay(randomNumber);
      } else {
        counter++;
        audioPlay(counter);
      }
    }

    const currentTime = Math.floor(audio.currentTime);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;

    pleerTextEl.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
}
