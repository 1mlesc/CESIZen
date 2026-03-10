import { z } from "zod";

export const contenuSchema = z.object({
  title: z
    .string({ error: "Le titre est requis" })
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(255, "Le titre ne peut pas dépasser 255 caractères"),

  corps: z
    .string({ error: "Le corps du contenu est requis" })
    .min(10, "Le contenu doit contenir au moins 10 caractères"),

  type: z.enum(["ARTICLE"], {
    error: "Type de contenu invalide",
  }),

  statut: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"], {
    error: "Statut de contenu invalide",
  }),

  date_publication: z.string().optional().nullable(),
  
  auteurId: z.string({ error: "L'auteur est requis" }),
  
  categoryIds: z.array(z.number()).min(1, "Veuillez sélectionner au moins une catégorie"),
});

export const updateStatusSchema = z.object({
  statut: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]),
});

export const categorieSchema = z.object({
  name: z.enum(["SANTE", "AIDE"], {
    error: "Nom de catégorie invalide",
  }),
});
