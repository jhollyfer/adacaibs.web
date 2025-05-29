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
    avatarId: z.string().trim().nullable(),
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
    avatarId: z.string().trim().nullable(),
  }),
} as const;

export type TestimonialCreatePayload = z.infer<
  (typeof TestimonialSchema)["create"]
>;
export type TestimonialUpdatePayload = z.infer<
  (typeof TestimonialSchema)["update"]
>;
