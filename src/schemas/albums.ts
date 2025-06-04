import { z } from "zod";
// title: vine.string().trim(),
// date: vine.string().trim().trim(),
// description: vine.string().trim().trim(),
// coverId: vine.string().trim().nullable(),
// imageIds: vine.array(vine.string().trim()),
export const AlbumSchema = {
  create: z.object({
    title: z
      .string({
        required_error: "Título é obrigatório",
      })
      .trim(),
    date: z.date({
      required_error: "Data é obrigatória",
    }),
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
    imageIds: z.array(z.string().trim()),
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
    imageIds: z.array(z.string().trim()),
  }),
} as const;

export type AlbumCreatePayload = z.infer<(typeof AlbumSchema)["create"]>;
export type AlbumUpdatePayload = z.infer<(typeof AlbumSchema)["update"]>;
