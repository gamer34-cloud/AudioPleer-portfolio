export function enter() {
  const formEl: HTMLFormElement = document.querySelector(
    "#form-enter"
  ) as HTMLFormElement;

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector(
      "#username"
    ) as HTMLInputElement;
    const password: HTMLInputElement = document.querySelector(
      "#password"
    ) as HTMLInputElement;

    interface fields {
      name: string;
      password: number | string;
    }

    const data: fields = {
      name: name.value,
      password: password.value,
    };

    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

  });
}

enter();
