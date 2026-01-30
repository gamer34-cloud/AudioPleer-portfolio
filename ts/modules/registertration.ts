import * as z from "zod";

import { postRegister } from "../server/postData";
import { fields, zodState } from "./typesAndInterfeis";

export function registertration() {
  const formEl: HTMLFormElement = document.querySelector(
    "#form-enter",
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
      ".form-enter__error",
    ) as HTMLDivElement;
    const errorTextEl: HTMLSpanElement = document.querySelector(
      ".form-enter__error-span",
    ) as HTMLSpanElement;

    const succssesEl: HTMLDivElement = document.querySelector(
      ".form-enter__succsess",
    ) as HTMLDivElement;

    const userSchema = z.object({
      username: z.string().min(3, "Имя должно быть не короче 2 символов"),
      password: z.string().min(4, "Пароль должен быть больше 3 символов"),
    });

    const data: fields = {
      username: name.value,
      password: password.value,
    };

    const result = userSchema.safeParse(data);

    if (result.success) {
      postRegister(data).then((res) => {
        errorEl.classList.remove("form-enter__error--active");
        succssesEl.classList.add("form-enter__succsess--active");
        // window.location.replace("./index.html");
      });
    } else {
      succssesEl.classList.remove("form-enter__succsess--active");

      const res: zodState = JSON.parse(result.error.message)[0] as zodState;
      errorEl.classList.add("form-enter__error--active");
      errorTextEl.textContent = res.message;
    }
  });
}

registertration();
