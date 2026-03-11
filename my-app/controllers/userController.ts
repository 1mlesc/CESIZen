import { UserModel } from "@/models/User";
import bcrypt from "bcryptjs";
import { updateProfileSchema, updatePasswordSchema } from "@/schemas/dashboard/front-office/userSchema";
import { prisma } from "@/lib/db";

// 1. Mise à jour du profil simple
export const getUserProfile = async (email: string) => {
  try {
    const user = await UserModel.findByEmail(email);
    if (!user) return { success: false, error: "Utilisateur introuvable." };
    
    // On mappe les champs pour correspondre aux schemas camelCase utilisés dans l'app
    const formattedUser = {
      ...user,
      firstName: user.first_name,
      lastName: user.family_name,
      birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : "",
    };
    
    return { success: true, data: formattedUser };
  } catch (error) {
    console.error("Fetch user profile error:", error);
    return { success: false, error: "Erreur lors de la récupération du profil." };
  }
};

export const updateUserProfile = async (email: string, data: any) => {
  const validation = updateProfileSchema.safeParse(data);
  if (!validation.success) return { success: false, error: validation.error.issues[0].message };

  try {
    await UserModel.update(email, {
      first_name: validation.data.firstName,
      family_name: validation.data.lastName,
      // On peut ajouter la date de naissance ici si on le souhaite
      ...(validation.data.birthdate && { birthdate: new Date(validation.data.birthdate) }),
    });
    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false, error: "Erreur lors de la mise à jour." };
  }
};

// 2. Changement de mot de passe (Sécurisé)
export const changeUserPassword = async (email: string, data: any) => {
  const validation = updatePasswordSchema.safeParse(data);
  if (!validation.success) return { success: false, error: validation.error.issues[0].message };

  const { currentPassword, newPassword } = validation.data;

  try {
    // A. On récupère l'user pour avoir son hash actuel
    const user = await UserModel.findByEmailWithPassword(email);
    if (!user) return { success: false, error: "Utilisateur introuvable." };

    // B. On vérifie que l'ancien mot de passe est bon
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return { success: false, error: "Le mot de passe actuel est incorrect." };

    // C. On hash le nouveau et on sauvegarde
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.update(email, { password: hashedPassword });

    return { success: true };
  } catch (error) {
    console.error("Change password error:", error);
    return { success: false, error: "Erreur serveur." };
  }
};

// 3. Admin : Récupérer tous les utilisateurs
export const fetchAllUsers = async () => {
  try {
    const users = await UserModel.getAll();
    // On retire les mots de passe avant de renvoyer
    const safeUsers = users.map(({ password, ...rest }) => rest);
    return { success: true, data: safeUsers };
  } catch (error) {
    console.error("Fetch all users error:", error);
    return { success: false, error: "Erreur lors de la récupération des utilisateurs." };
  }
};

export const adminUserUpdate = async (id: string, data: any) => {
  try {
    // Si un nouveau mot de passe est fourni, on vérifie sa longueur et on le hache
    if (data.password && data.password.trim() !== "") {
      if (data.password.length < 12) {
        return { success: false, error: "Le mot de passe doit contenir au moins 12 caractères." };
      }
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }

    // Gestion de la date
    if (data.birthdate) {
      data.birthdate = new Date(data.birthdate);
    }

    // Gestion du rôle (conversion du nom du rôle en roleId)
    if (data.role) {
      const roleRecord = await prisma.role.findFirst({
        where: { role: data.role === "ADMIN" ? "ADMIN" : "USER" }
      });
      if (roleRecord) {
        data.roleId = roleRecord.id;
      }
      delete data.role;
    }

    // Gestion du rôle par ID (si envoyé directement)
    if (data.roleId) {
      data.roleId = parseInt(data.roleId);
    }

    await UserModel.updateById(id, data);
    return { success: true };
  } catch (error) {
    console.error("Admin user update error:", error);
    return { success: false, error: "Erreur lors de la mise à jour." };
  }
};

export const adminUserDelete = async (id: string) => {
  try {
    await UserModel.delete(id);
    return { success: true };
  } catch (error) {
    console.error("Admin user delete error:", error);
    return { success: false, error: "Erreur lors de la suppression." };
  }
};