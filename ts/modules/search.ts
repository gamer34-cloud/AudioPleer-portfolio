export function inputSearch() {
  const input: HTMLInputElement = document.querySelector(
    "#input-search",
  ) as HTMLInputElement;

  input.addEventListener("input", function (e) {
    console.log(input.value);
  });
}
