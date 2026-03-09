"use server";

import { auth } from "@/auth";
import { getUserProfile, updateUserProfile, changeUserPassword, fetchAllUsers } from "@/controllers/userController";
import { revalidatePath } from "next/cache";

// Action pour récupérer les infos du profil
export async function getUserProfileAction() {
  const session = await auth();
  if (!session || !session.user?.email) return { error: "Non autorisé" };

  const result = await getUserProfile(session.user.email);

  if (result.success) {
    return { success: true, user: result.data };
  }
  return { error: result.error };
}

// Action pour le profil
export async function updateProfileAction(formData: any) {
  const session = await auth();
  if (!session || !session.user?.email) return { error: "Non autorisé" };

  const result = await updateUserProfile(session.user.email, formData);

  if (result.success) {
    // Met à jour toutes les pages pour refléter le nouveau nom
    revalidatePath("/dashboard"); 
    return { success: true, message: "Profil mis à jour !" };
  }
  return { error: result.error };
}

// Action pour le mot de passe
export async function updatePasswordAction(formData: any) {
  const session = await auth();
  if (!session || !session.user?.email) return { error: "Non autorisé" };

  const result = await changeUserPassword(session.user.email, formData);

  if (result.success) {
    return { success: true, message: "Mot de passe modifié avec succès." };
  }
  return { error: result.error };
}

// Action ADMIN : Récupérer tous les utilisateurs
export async function getAllUsersAction() {
  const session = await auth();
  
  // Vérification stricte du rôle ADMIN
  if (!session || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Accès refusé. Rôle administrateur requis." };
  }

  const result = await fetchAllUsers();
  return result;
}