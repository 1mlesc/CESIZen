"use server";

import { auth } from "@/auth";
import { recordSession, fetchAllExercices, fetchUserStats } from "@/controllers/exerciceController";

export async function getExerciceAction(id: string) {
  return await fetchAllExercices();
}

export async function saveSessionAction(exerciceId: string) {
  const session = await auth();
  
  // Si l'utilisateur n'est pas connecté, on ne fait rien (fail silencieux ou on avertit)
  if (!session || !session.user?.id) {
    return { success: false, error: "Non connecté" };
  }

  const result = await recordSession(session.user.id, exerciceId);
  return result;
}

export async function getUserStatsAction() {
  const session = await auth();
  
  if (!session || !session.user?.id) {
    return { success: false, error: "Non connecté" };
  }

  return await fetchUserStats(session.user.id);
}