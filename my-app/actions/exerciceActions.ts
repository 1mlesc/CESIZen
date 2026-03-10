"use server";

import { auth } from "@/auth";
import { recordSession, fetchAllExercices, fetchUserStats, adminExerciceCreate, adminExerciceUpdate, adminExerciceDelete } from "@/controllers/exerciceController";
import { revalidatePath } from "next/cache";

export async function getAllExercicesAction() {
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

// Action ADMIN : Créer un exercice
export async function adminCreateExerciceAction(data: any) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") return { success: false, error: "Non autorisé" };

  const result = await adminExerciceCreate(data);
  if (result.success) revalidatePath("/admin/exercices");
  return result;
}

// Action ADMIN : Mettre à jour un exercice
export async function adminUpdateExerciceAction(id: string, data: any) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") return { success: false, error: "Non autorisé" };

  const result = await adminExerciceUpdate(id, data);
  if (result.success) revalidatePath("/admin/exercices");
  return result;
}

// Action ADMIN : Supprimer un exercice
export async function adminDeleteExerciceAction(id: string) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") return { success: false, error: "Non autorisé" };

  const result = await adminExerciceDelete(id);
  if (result.success) revalidatePath("/admin/exercices");
  return result;
}