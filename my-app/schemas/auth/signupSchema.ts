import { z } from "zod";

export const signupSchema = z.object({
  first_name: z
    .string({error: "Le prénom est requis"})
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prénom contient des caractères non autorisés"),

  last_name: z
    .string({error: "Le nom de famille est requis"})
    .trim()
    .min(2, "Le nom de famille doit contenir au moins 2 caractères")
    .max(50, "Le nom de famille ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom contient des caractères non autorisés"),

  birth_date: z
    .string({error: "La date de naissance est requise"})
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 15;
    }, "Vous devez avoir au moins 15 ans pour vous inscrire"),
  
  email: z
    .email({error: "L'email est invalide"})
    .toLowerCase()
    .trim()
    .max(255, "L'email est trop long"),

  password: z
    .string({error: "Le mot de passe est requis"})
    .min(12, "Le mot de passe doit contenir au moins 12 caractères")
    .max(100, "Le mot de passe ne peut pas dépasser 100 caractères")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),

  confirm_password: z
    .string({error: "La confirmation du mot de passe est requise"}),

}).refine((data) => data.password === data.confirm_password, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirm_password"],
});

export const loginSchema = z.object({
  email: z
    .email({error: "L'email est invalide"})
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, "Le mot de passe est requis"),
});