import { EventCategory } from "@/lib/model";
import { z } from "zod";

export const EventSchema = {
  create: z.object({
    title: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .trim(),
    date: z.date({
      required_error: "Data é obrigatória",
    }),
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
    capacity: z.coerce.number().positive(),
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
    coverId: z.string().trim().nullable(),
  }),
  update: z.object({
    id: z.string({ required_error: "ID é obrigatório" }),
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
    capacity: z.coerce.number().positive(),
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
    coverId: z.string().trim().nullable(),
  }),
} as const;

export type EventCreatePayload = z.infer<(typeof EventSchema)["create"]>;
export type EventUpdatePayload = z.infer<(typeof EventSchema)["update"]>;
