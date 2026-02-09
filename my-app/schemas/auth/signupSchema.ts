import { z } from "zod";

export const signupSchema = z.object({
  first_name: z
    .string({error: "Le prénom est requis"})
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),

  last_name: z
    .string({error: "Le nom de famille est requis"})
    .min(2, "Le nom de famille doit contenir au moins 2 caractères")
    .max(50, "Le nom de famille ne peut pas dépasser 50 caractères"),
  birth_date: z
    .string({error: "La date de naissance est requise"}),
  
  email: z
    .email({error: "L'email est requis"})
    .toLowerCase()
    .trim(),
  password: z
    .string({error: "Le mot de passe est requis"})
    .min(12, "")
    .max(100, "Le mot de passe ne peut pas dépasser 100 caractères"),
  confirm_password: z
    .string({error: "La confirmation du mot de passe est requise"}),

}).refine((data) => data.password === data.confirm_password, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirm_password"],
});