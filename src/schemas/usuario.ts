import { UserRole } from "@/lib/model";
import { z } from "zod";

export const UserSchema = {
  create: z.object({
    name: z.string({ required_error: "Nome é obrigatório" }).trim(),
    email: z
      .string({
        required_error: "E-mail é obrigatório",
      })
      .trim()
      .email(),
    role: z.nativeEnum(UserRole, { required_error: "Função é obrigatória" }),
    avatar: z.string().trim().nullable(),
    // files: SOMENTE PARA O UPLOAD DO AVATAR DO USUÁRIO
    files: z
      .array(
        z.instanceof(File).refine((file) => file.size < 2 * 1024 * 1024, {
          message: "O arquivo deve ter no máximo 2MB",
        })
      )
      .max(1, {
        message: "Você pode enviar apenas um arquivo",
      })
      .nullable(),
  }),
  update: z.object({
    id: z.string({ required_error: "ID é obrigatório" }),
    name: z.string({ required_error: "Nome é obrigatório" }).trim(),
    email: z
      .string({
        required_error: "E-mail é obrigatório",
      })
      .trim()
      .email(),
    role: z.nativeEnum(UserRole, { required_error: "Função é obrigatória" }),
    avatar: z.string().trim().nullable(),

    // files: SOMENTE PARA O UPLOAD DO AVATAR DO USUÁRIO
    files: z
      .array(
        z.instanceof(File).refine((file) => file.size < 2 * 1024 * 1024, {
          message: "O arquivo deve ter no máximo 2MB",
        })
      )
      .max(1, {
        message: "Você pode enviar apenas um arquivo",
      })
      .nullable(),
  }),
} as const;

export type UserCreatePayload = z.infer<(typeof UserSchema)["create"]>;
export type UserUpdatePayload = z.infer<(typeof UserSchema)["update"]>;
