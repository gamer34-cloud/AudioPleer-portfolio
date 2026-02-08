import { el } from "redom";

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getLoader(): HTMLElement {
  return el("span", { class: "loader" });
}
