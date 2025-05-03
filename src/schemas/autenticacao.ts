import { z } from "zod";

export const AuthenticationSchema = {
  "sign-in": z.object({
    email: z
      .string({
        required_error: "E-mail é obrigatório",
      })
      .trim()
      .email({
        message: "E-mail inválido",
      }),
    password: z
      .string({
        required_error: "Senha é obrigatória",
      })
      .trim(),
  }),
};

export type SignInPayload = z.infer<(typeof AuthenticationSchema)["sign-in"]>;
export type SingInResponse = { token: string };
