import { prisma } from "@/lib/db";

export const ContenuModel = {
  /**
   * Récupérer tous les contenus avec l'auteur et les catégories
   */
  getAll: async () => {
    return await prisma.contenu.findMany({
      include: {
        auteur: {
          select: {
            id: true,
            first_name: true,
            family_name: true,
            email: true,
          },
        },
        categories: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  /**
   * Récupérer un contenu par son ID
   */
  getById: async (id: number) => {
    return await prisma.contenu.findUnique({
      where: { id },
      include: {
        auteur: {
          select: {
            id: true,
            first_name: true,
            family_name: true,
            email: true,
          },
        },
        categories: true,
      },
    });
  },

  /**
   * Créer un nouveau contenu
   */
  create: async (data: any) => {
    const { categoryIds, ...rest } = data;
    return await prisma.contenu.create({
      data: {
        ...rest,
        categories: {
          connect: categoryIds?.map((id: number) => ({ id })) || [],
        },
      },
      include: { categories: true },
    });
  },

  /**
   * Mettre à jour un contenu
   */
  update: async (id: number, data: any) => {
    const { categoryIds, ...rest } = data;
    return await prisma.contenu.update({
      where: { id },
      data: {
        ...rest,
        categories: {
          set: categoryIds?.map((id: number) => ({ id })) || [],
        },
      },
      include: { categories: true },
    });
  },

  /**
   * Supprimer un contenu
   */
  delete: async (id: number) => {
    return await prisma.contenu.delete({
      where: { id },
    });
  },

  /**
   * Mettre à jour seulement le statut
   */
  updateStatus: async (id: number, statut: any) => {
    return await prisma.contenu.update({
      where: { id },
      data: { statut },
    });
  },
};
