import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string({error: "Le prénom est requis"})
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prénom contient des caractères non autorisés"),

  lastName: z
    .string({error: "Le nom de famille est requis"})
    .trim()
    .min(2, "Le nom de famille doit contenir au moins 2 caractères")
    .max(50, "Le nom de famille ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom contient des caractères non autorisés"),

  birthdate: z.string().optional().refine((date) => {
    if (!date) return true;
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 15;
  }, "Vous devez avoir au moins 15 ans"),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Mot de passe actuel requis"),
  newPassword: z
    .string({error: "Le nouveau mot de passe est requis"})
    .min(12, "Le nouveau mot de passe doit contenir au moins 12 caractères")
    .max(100, "Le nouveau mot de passe ne peut pas dépasser 100 caractères")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});