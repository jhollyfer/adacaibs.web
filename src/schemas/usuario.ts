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
    avatarId: z.string().trim().nullable(),
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
    avatarId: z.string().trim().nullable(),
  }),
} as const;

export type UserCreatePayload = z.infer<(typeof UserSchema)["create"]>;
export type UserUpdatePayload = z.infer<(typeof UserSchema)["update"]>;
