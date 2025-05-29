import { z } from "zod";

export const VideoSchema = {
  create: z.object({
    title: z
      .string({
        required_error: "Título é obrigatório",
      })
      .trim(),
    date: z.date({
      required_error: "Data é obrigatória",
    }),
    duration: z
      .string({
        required_error: "Duração é obrigatória",
      })
      .trim(),
    instructor: z
      .string({
        required_error: "Instrutor é obrigatório",
      })
      .trim(),
    url: z
      .string({
        required_error: "URL é obrigatória",
      })
      .trim(),
    description: z
      .string({
        required_error: "Descrição é obrigatória",
      })
      .trim(),
    coverId: z
      .string({
        required_error: "Capa é obrigatória",
      })
      .trim()
      .nullable(),
  }),
  update: z.object({
    id: z.string({ required_error: "ID é obrigatório" }),
    title: z
      .string({
        required_error: "Título é obrigatório",
      })
      .trim(),
    date: z.date({
      required_error: "Data é obrigatória",
    }),
    duration: z
      .string({
        required_error: "Duração é obrigatória",
      })
      .trim(),
    instructor: z
      .string({
        required_error: "Instrutor é obrigatório",
      })
      .trim(),
    url: z
      .string({
        required_error: "URL é obrigatória",
      })
      .trim(),
    description: z
      .string({
        required_error: "Descrição é obrigatória",
      })
      .trim(),
    coverId: z
      .string({
        required_error: "Capa é obrigatória",
      })
      .trim()
      .nullable(),
  }),
} as const;

export type VideoCreatePayload = z.infer<(typeof VideoSchema)["create"]>;
export type VideoUpdatePayload = z.infer<(typeof VideoSchema)["update"]>;
