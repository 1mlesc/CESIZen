import { ExerciceRespiratoireModel } from "@/models/ExerciceRespiratoire";

export const fetchAllExercices = async () => {
  try {
    const exercices = await ExerciceRespiratoireModel.getAll();
    return { success: true, data: exercices };
  } catch (error) {
    console.error("Erreur fetchAllExercices:", error);
    return { success: false, error: "Impossible de charger les exercices." };
  }
};


export const recordSession = async (userId: string, exerciceId: string) => {
  try {
    if (!userId || !exerciceId) return { success: false, error: "Données manquantes." };
    
    await ExerciceRespiratoireModel.saveHistory(userId, exerciceId);
    return { success: true };
    } catch (error) {
    return { success: false, error: "Impossible de sauvegarder l'historique." };
    }
    };

    export const adminExerciceCreate = async (data: any) => {
    try {
    await ExerciceRespiratoireModel.create(data);
    return { success: true };
    } catch (error) {
    console.error("Admin exercice create error:", error);
    return { success: false, error: "Erreur lors de la création de l'exercice." };
    }
    };

    export const adminExerciceUpdate = async (id: string, data: any) => {
    try {
    await ExerciceRespiratoireModel.updateById(id, data);
    return { success: true };
    } catch (error) {
    console.error("Admin exercice update error:", error);
    return { success: false, error: "Erreur lors de la mise à jour de l'exercice." };
    }
    };

    export const adminExerciceDelete = async (id: string) => {
    try {
    await ExerciceRespiratoireModel.delete(id);
    return { success: true };
    } catch (error) {
    console.error("Admin exercice delete error:", error);
    return { success: false, error: "Erreur lors de la suppression de l'exercice." };
    }
    };

    export const fetchUserStats = async (userId: string) => {
  try {
    if (!userId) return { success: false, error: "Utilisateur non identifié." };
    
    const stats = await ExerciceRespiratoireModel.getUserStats(userId);
    return { success: true, data: stats };
  } catch (error) {
    console.error("Erreur fetchUserStats:", error);
    return { success: false, error: "Impossible de charger les statistiques." };
  }
};