"use server";

import { auth } from "@/auth";
import { getUserProfile, updateUserProfile, changeUserPassword, fetchAllUsers, adminUserUpdate, adminUserDelete } from "@/controllers/userController";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// Action pour récupérer les infos du profil
export async function getUserProfileAction() {
  const session = await auth();
  if (!session || !session.user?.email) return { success: false, error: "Non autorisé" };

  const result = await getUserProfile(session.user.email);

  if (result.success) {
    return { success: true, user: result.data };
  }
  return { success: false, error: result.error };
}

// Action pour le profil
export async function updateProfileAction(formData: any) {
  const session = await auth();
  if (!session || !session.user?.email) return { success: false, error: "Non autorisé" };

  const result = await updateUserProfile(session.user.email, formData);

  if (result.success) {
    revalidatePath("/dashboard"); 
    return { success: true, message: "Profil mis à jour !" };
  }
  return { success: false, error: result.error };
}

// Action pour le mot de passe
export async function updatePasswordAction(formData: any) {
  const session = await auth();
  if (!session || !session.user?.email) return { success: false, error: "Non autorisé" };

  const result = await changeUserPassword(session.user.email, formData);

  if (result.success) {
    return { success: true, message: "Mot de passe modifié avec succès." };
  }
  return { success: false, error: result.error };
}

// Action ADMIN : Récupérer tous les utilisateurs
export async function getAllUsersAction() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Accès refusé. Rôle administrateur requis." };
  }
  return await fetchAllUsers();
}

// Action ADMIN : Mettre à jour un utilisateur
export async function adminUpdateUserAction(id: string, data: any) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") return { success: false, error: "Non autorisé" };

  const result = await adminUserUpdate(id, data);
  if (result.success) revalidatePath("/admin/users");
  return result;
}

// Action ADMIN : Supprimer un utilisateur
export async function adminDeleteUserAction(id: string) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") return { success: false, error: "Non autorisé" };

  const result = await adminUserDelete(id);
  if (result.success) revalidatePath("/admin/users");
  return result;
}

// Action ADMIN : Créer un utilisateur
export async function adminCreateUserAction(data: any) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") return { success: false, error: "Non autorisé" };

  try {
    if (!data.password || data.password.length < 12) {
      return { success: false, error: "Le mot de passe doit contenir au moins 12 caractères." };
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Déterminer le rôle
    const roleRecord = await prisma.role.findFirst({
      where: { role: data.role === "ADMIN" ? "ADMIN" : "USER" }
    });
    const roleId = roleRecord?.id;

    if (!roleId) return { success: false, error: "Rôle introuvable." };

    await prisma.user.create({
      data: {
        email: data.email,
        family_name: data.family_name,
        first_name: data.first_name,
        birthdate: new Date(data.birthdate),
        password: hashedPassword,
        roleId: roleId,
        statut: data.statut || "ON"
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Admin create user error:", error);
    return { success: false, error: "Erreur lors de la création." };
  }
}