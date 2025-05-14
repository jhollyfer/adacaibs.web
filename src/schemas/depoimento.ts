import { TestimonialStatus } from "@/lib/model";
import { z } from "zod";

export const TestimonialSchema = {
  create: z.object({
    name: z.string({ required_error: "Nome é obrigatório" }).trim(),
    position: z
      .string({ required_error: "Cargo/Ocupação é obrigatório" })
      .trim(),
    rating: z.string({ required_error: "Avaliação é obrigatória" }).trim(),
    testimonial: z
      .string({ required_error: "Depoimento é obrigatório" })
      .trim(),
    status: z.nativeEnum(TestimonialStatus, {
      required_error: "Status é obrigatório",
    }),
    avatar_id: z.string().trim().nullable(),

    // files: SOMENTE PARA O UPLOAD DA FOTO DO DEPOIMENTO
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
    id: z.string({ required_error: "ID é obrigatório" }),
    name: z.string({ required_error: "Nome é obrigatório" }).trim(),
    position: z
      .string({ required_error: "Cargo/Ocupação é obrigatório" })
      .trim(),
    rating: z.string({ required_error: "Avaliação é obrigatória" }).trim(),
    testimonial: z
      .string({ required_error: "Depoimento é obrigatório" })
      .trim(),
    status: z.nativeEnum(TestimonialStatus, {
      required_error: "Status é obrigatório",
    }),
    avatar_id: z.string().trim().nullable(),

    // files: SOMENTE PARA O UPLOAD DA FOTO DO DEPOIMENTO
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

export type TestimonialCreatePayload = z.infer<
  (typeof TestimonialSchema)["create"]
>;
export type TestimonialUpdatePayload = z.infer<
  (typeof TestimonialSchema)["update"]
>;
