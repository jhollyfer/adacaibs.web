import { EventCategory, TestimonialStatus } from "@/lib/model";
import { z } from "zod";

export const EventSchema = {
  create: z.object({
    title: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .trim(),
    date: z
      .string({
        required_error: "Data é obrigatória",
      })
      .trim(),
    hour: z
      .string({
        required_error: "Hora é obrigatória",
      })
      .trim(),
    location: z
      .string({
        required_error: "Localização é obrigatória",
      })
      .trim(),
    address: z
      .string({
        required_error: "Endereço é obrigatório",
      })
      .trim(),
    category: z.nativeEnum(EventCategory, {}),
    capacity: z.number().positive(),
    resume: z
      .string({
        required_error: "Resumo é obrigatório",
      })
      .trim(),
    content: z
      .string({
        required_error: "Conteúdo é obrigatório",
      })
      .trim(),
    cover_id: z.string().trim().nullable(),

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

export type EventCreatePayload = z.infer<(typeof EventSchema)["create"]>;
export type EventUpdatePayload = z.infer<(typeof EventSchema)["update"]>;
