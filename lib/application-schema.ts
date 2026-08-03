import { z } from "zod";

export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Введите имя"),
  phone: z.string().trim().min(7, "Введите номер телефона"),
  email: z
    .string()
    .trim()
    .refine((value) => value === "" || z.string().email().safeParse(value).success, "Введите корректный email"),
  interest: z.string().trim().min(2, "Выберите направление"),
  comment: z.string().trim().max(800, "Комментарий слишком длинный").optional()
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
