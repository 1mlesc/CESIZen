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