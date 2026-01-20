import * as z from "zod";

export function enter() {
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

    interface fields {
      name: string;
      password: number | string;
    }

    const userSchema = z.object({
      name: z.string().min(3, "Имя должно быть не короче 2 символов"),
      password: z.string().min(4, "Пароль должен быть больше 3 символов"),
    });

    const data: fields = {
      name: name.value,
      password: password.value,
    };

    console.log(data);

    const result = userSchema.safeParse(data);

    if (result.success) {
      errorEl.classList.remove("form-enter__error--active");
    } else {
      type zodM = {
        origin?: string;
        code: string;
        minimum: number;
        inclusive: boolean;
        path?: [];
        message: string;
      };
      const res: zodM = JSON.parse(result.error.message)[0] as zodM;
      errorEl.classList.add("form-enter__error--active");
      errorTextEl.textContent = res.message;
    }
  });
}

enter();
