export default function init() {
  const name: string = localStorage.getItem("username") as string;
  const spanEl: HTMLSpanElement = document.querySelector(
    ".hero__header-text"
  ) as HTMLSpanElement;
  if (name) {
    spanEl.textContent = name;
  } else {
    spanEl.textContent = "user";
  }
}
