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

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    interface exampleResponse {
      message: "авторизация прошла успешно";
      token: "eyJhbGciOiJIUzI1NiIsInR5...";
    }

    const token: exampleResponse = await response.json();

    localStorage.setItem("autarisation-token", token.token);
    console.log(token)
    localStorage.setItem("username", data.name);
    console.log(response);

    window.location.replace('./index.html');
  });
}

enter();
