import { prisma } from "@/lib/db";

export const CategorieModel = {
  /**
   * Récupérer toutes les catégories
   */
  getAll: async () => {
    return await prisma.categorie.findMany({
      orderBy: { name: "asc" },
    });
  },

  /**
   * Créer une catégorie
   */
  create: async (name: any) => {
    return await prisma.categorie.create({
      data: { name },
    });
  },

  /**
   * Modifier le nom d'une catégorie
   */
  update: async (id: number, name: any) => {
    return await prisma.categorie.update({
      where: { id },
      data: { name },
    });
  },

  /**
   * Supprimer une catégorie
   */
  delete: async (id: number) => {
    return await prisma.categorie.delete({
      where: { id },
    });
  },
};
