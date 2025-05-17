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
    tags: z.array(z.string()),
    cover_id: z.string().trim().nullable(),

    // files: SOMENTE PARA O UPLOAD DA CAPA DA NOTÍCIA
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
    category: z.nativeEnum(NoticeCategory, {
      required_error: "Categoria é obrigatória",
    }),
    status: z.nativeEnum(NoticeStatus, {
      required_error: "Status é obrigatório",
    }),
    resume: z.string({ required_error: "Resumo é obrigatório" }).trim(),
    content: z.string({ required_error: "Conteúdo é obrigatório" }).trim(),
    tags: z.array(z.string()),
    cover_id: z.string().trim().nullable(),

    // files: SOMENTE PARA O UPLOAD DA CAPA DA NOTÍCIA
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

export type NoticeCreatePayload = z.infer<
  (typeof NoticeSchema)["create"]
>
export type NoticeUpdatePayload = z.infer<
  (typeof NoticeSchema)["update"]
>