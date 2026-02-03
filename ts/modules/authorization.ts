import { fields, exampleResponse } from "./typesAndInterfeis";

export function authorization() {
  const formEl: HTMLFormElement = document.querySelector(
    "#form-authorization",
  ) as HTMLFormElement;

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector(
      "#username",
    ) as HTMLInputElement;
    const password: HTMLInputElement = document.querySelector(
      "#password",
    ) as HTMLInputElement;

    const errorEl: HTMLDivElement = document.querySelector(
      ".form-authorization__error",
    ) as HTMLDivElement;
    const errorTextEl: HTMLSpanElement = document.querySelector(
      ".form-authorization__error-span",
    ) as HTMLSpanElement;

    const data: fields = {
      username: name.value,
      password: password.value,
    };

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      if (response.ok) {


        const token: exampleResponse = await response.json();

        localStorage.setItem("autarisation-token", token.token);
        localStorage.setItem("username", data.username);

        window.location.replace("./index.html");
      } else {
        const err = new Error("Введены некоректные данные");
        err.name = "errorSignUp";
        throw err;
      }
    } catch (error: unknown) {
      if(error instanceof Error) {
        errorEl.classList.add('form-authorization__error--active')
      errorTextEl.textContent = error.message
      }
    }
  });
}

authorization();
