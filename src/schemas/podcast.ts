import { z } from "zod";

export const PodcastSchema = {
  create: z.object({
    title: z.string({ required_error: "Título é obrigatório" }).trim(),
    date: z.date({
      required_error: "Data é obrigatória",
    }),
    duration: z.string({ required_error: "Duração é obrigatória" }).trim(),
    presenters: z.array(z.string(), {
      required_error: "Apresentadores é obrigatória",
    }),
    guests: z.array(z.string(), {
      required_error: "Convidados é obrigatória",
    }),
    description: z.string({ required_error: "Descrição é obrigatória" }).trim(),
    coverId: z.string().trim().nullable(),
    audioId: z.string().trim().nullable(),
  }),
  update: z.object({
    id: z.string({ required_error: "ID é obrigatório" }),
    title: z.string({ required_error: "Título é obrigatório" }).trim(),
    date: z.date({
      required_error: "Data é obrigatória",
    }),
    duration: z.string({ required_error: "Duração é obrigatória" }).trim(),
    presenters: z.array(z.string(), {
      required_error: "Apresentadores é obrigatória",
    }),
    guests: z.array(z.string(), {
      required_error: "Convidados é obrigatória",
    }),
    description: z.string({ required_error: "Descrição é obrigatória" }).trim(),
    coverId: z.string().trim().nullable(),
    audioId: z.string().trim().nullable(),
  }),
} as const;

export type PodcastCreatePayload = z.infer<(typeof PodcastSchema)["create"]>;
export type PodcastUpdatePayload = z.infer<(typeof PodcastSchema)["update"]>;
