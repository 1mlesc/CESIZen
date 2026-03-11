import { prisma } from "@/lib/db";

export const ExerciceRespiratoireModel = {
  // Récupérer tous les exercices
  getAll: async () => {
    return await prisma.exerciceRespiratoire.findMany({
      orderBy: { createdAt: 'asc' }
    });
  },

  // Créer un exercice
  create: async (data: any) => {
    return await prisma.exerciceRespiratoire.create({
      data: {
        duree: parseFloat(data.duree),
        rythme_inspiration: parseFloat(data.rythme_inspiration),
        rythme_expiration: parseFloat(data.rythme_expiration),
        rythme_apnee: parseFloat(data.rythme_apnee),
      }
    });
  },

  // Modifier un exercice
  updateById: async (id: string, data: any) => {
    return await prisma.exerciceRespiratoire.update({
      where: { id },
      data: {
        duree: parseFloat(data.duree),
        rythme_inspiration: parseFloat(data.rythme_inspiration),
        rythme_expiration: parseFloat(data.rythme_expiration),
        rythme_apnee: parseFloat(data.rythme_apnee),
      }
    });
  },

  // Supprimer un exercice
  delete: async (id: string) => {
    return await prisma.exerciceRespiratoire.delete({
      where: { id }
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
  },

  // Récupérer les statistiques d'un utilisateur
  getUserStats: async (userId: string) => {
    try {
      const history = await prisma.historiqueExerciceRespiratoire.findMany({
        where: { 
          userId: userId 
        },
        include: {
          exercice: true
        },
        orderBy: { 
          date: 'desc' 
        }
      });

      const totalSessions = history.length;
      const totalDuration = history.reduce((acc, curr) => {
        const duration = curr.exercice?.duree || 0;
        return acc + duration;
      }, 0);
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentHistory = history.filter(h => {
        if (!h.date) return false;
        const historyDate = new Date(h.date);
        return historyDate >= sevenDaysAgo;
      });
      
      return {
        totalSessions,
        totalDuration,
        history: history.slice(0, 5),
        recentCount: recentHistory.length
      };
    } catch (error) {
      console.error("Erreur critique dans ExerciceRespiratoireModel.getUserStats:", error);
      throw error;
    }
  }
};