import { prisma } from "@/lib/db";

export const ExerciceRespiratoireModel = {
  // Récupérer tous les exercices
  getAll: async () => {
    return await prisma.exerciceRespiratoire.findMany({
      orderBy: { createdAt: 'asc' }
    });
  },

  // Enregistrer la session complétée
  saveHistory: async (userId: string, exerciceId: string) => {
    return await prisma.historiqueExerciceRespiratoire.create({
      data: {
        userId: userId,
        exerciceRespiratoireId: exerciceId,
        date: new Date()
      }
    });
  }
};