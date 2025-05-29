import { z } from "zod";

export const PodcastSchema = {
  create: z.object({
    title: z.string({ required_error: "Título é obrigatório" }).trim(),
    date: z.string({ required_error: "Data é obrigatória" }).trim(),
    duration: z.string({ required_error: "Duração é obrigatória" }).trim(),
    presenters: z.string(),
    guests: z.string(),
    description: z.string({ required_error: "Descrição é obrigatória" }).trim(),
    coverId: z.string().trim().nullable(),
    audio_id: z.string().trim().nullable(),
  }),
  update: z.object({
    id: z.string({ required_error: "ID é obrigatório" }),
    title: z.string({ required_error: "Título é obrigatório" }).trim(),
    date: z.string({ required_error: "Data é obrigatória" }).trim(),
    duration: z.string({ required_error: "Duração é obrigatória" }).trim(),
    presenters: z.string(),
    guests: z.string(),
    description: z.string({ required_error: "Descrição é obrigatória" }).trim(),
    coverId: z.string().trim().nullable(),
    audio_id: z.string().trim().nullable(),
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
