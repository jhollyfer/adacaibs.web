import { NoticeCategory, NoticeStatus } from "@/lib/model";
import { z } from "zod";

export const NoticeSchema = {
  create: z.object({
    title: z.string({ required_error: "Título é obrigatório" }).trim(),
    category: z.nativeEnum(NoticeCategory, {
      required_error: "Categoria é obrigatória",
    }),
    status: z.nativeEnum(NoticeStatus, {
      required_error: "Status é obrigatório",
    }),
    resume: z.string({ required_error: "Resumo é obrigatório" }).trim(),
    content: z.string({ required_error: "Conteúdo é obrigatório" }).trim(),
    tags: z.array(z.string(), {
      required_error: "Tags é obrigatória",
    }),
    coverId: z.string().trim().nullable(),
  }),
  update: z.object({
    id: z.string({ required_error: "ID é obrigatório" }),
    title: z.string({ required_error: "Título é obrigatório" }).trim(),
    category: z.nativeEnum(NoticeCategory, {
      required_error: "Categoria é obrigatória",
    }),
    status: z.nativeEnum(NoticeStatus, {
      required_error: "Status é obrigatório",
    }),
    resume: z.string({ required_error: "Resumo é obrigatório" }).trim(),
    content: z.string({ required_error: "Conteúdo é obrigatório" }).trim(),
    tags: z.array(z.string(), {
      required_error: "Tags é obrigatória",
    }),
    coverId: z.string().trim().nullable(),
  }),
} as const;

export type NoticeCreatePayload = z.infer<(typeof NoticeSchema)["create"]>;
export type NoticeUpdatePayload = z.infer<(typeof NoticeSchema)["update"]>;
