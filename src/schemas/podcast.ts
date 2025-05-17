import { z } from "zod";

export const PodcastSchema = {
  create: z.object({
    title: z.string({ required_error: "Título é obrigatório" }).trim(),
    date: z.string({ required_error: "Data é obrigatória" }).trim(),
    duration: z.string({ required_error: "Duração é obrigatória" }).trim(),
    presenters: z.string(),
    guests: z.string(),
    description: z.string({ required_error: "Descrição é obrigatória" }).trim(),
    cover_id: z.string().trim().nullable(),
    audio_id: z.string().trim().nullable(),

    // files: SOMENTE PARA O UPLOAD DA CAPA DO PODCAST
    files: z
      .array(
        z.instanceof(File).refine((file) => file.size < 2 * 1024 * 1024, {
          message: "O arquivo deve ter no máximo 2MB",
        })
      )
      .max(1, {
        message: "Você pode enviar apenas um arquivo",
      })
      .nullable(),
  }),
  update: z.object({
    id: z.string({ required_error: "ID é obrigatório" }),
    title: z.string({ required_error: "Título é obrigatório" }).trim(),
    date: z.string({ required_error: "Data é obrigatória" }).trim(),
    duration: z.string({ required_error: "Duração é obrigatória" }).trim(),
    presenters: z.string(),
    guests: z.string(),
    description: z.string({ required_error: "Descrição é obrigatória" }).trim(),
    cover_id: z.string().trim().nullable(),
    audio_id: z.string().trim().nullable(),

    // files: SOMENTE PARA O UPLOAD DA CAPA DO PODCAST
    files: z
      .array(
        z.instanceof(File).refine((file) => file.size < 2 * 1024 * 1024, {
          message: "O arquivo deve ter no máximo 2MB",
        })
      )
      .max(1, {
        message: "Você pode enviar apenas um arquivo",
      })
      .nullable(),
  }),
} as const;

export const PodcastTransformedSchema = PodcastSchema.create.transform(
  (data) => ({
    ...data,
    presenters: data.presenters
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0),
    guests: data.guests
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g.length > 0),
  })
);

export type PodcastCreatePayload = z.infer<(typeof PodcastSchema)["create"]>;
export type PodcastUpdatePayload = z.infer<(typeof PodcastSchema)["update"]>;
