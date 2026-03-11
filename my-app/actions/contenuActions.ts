"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import {
  fetchAllContenus,
  getContenuById,
  createContenu,
  updateContenu,
  updateContenuStatus,
  deleteContenu,
  fetchAllCategories,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from "@/controllers/contenuController";

// Middleware de vérification Admin
async function checkAdmin() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    throw new Error("Non autorisé. Accès administrateur requis.");
  }
  return session;
}

// Actions Publiques
export async function getPublishedContenusAction() {
  try {
    const result = await fetchAllContenus();
    if (result.success && result.data) {
      // Filtrer pour ne garder que les publiés pour le public
      const published = result.data.filter((c: any) => c.statut === "PUBLISHED");
      return { success: true, data: published };
    }
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Action publique pour un seul contenu
export async function getContenuByIdAction(id: number) {
  try {
    const result = await getContenuById(id);
    if (!result.success || !result.data) return result;
    
    const contenu = result.data;
    if (contenu.statut !== "PUBLISHED") {
      return { success: false, error: "Contenu non publié." };
    }
    return { success: true, data: contenu };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 1. Actions pour les Contenus
export async function getAllContenusAction() {
  try {
    await checkAdmin();
    return await fetchAllContenus();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createContenuAction(data: any) {
  try {
    const session = await checkAdmin();
    // On force l'auteurId à être celui de la session de l'admin connecté
    const payload = { ...data, auteurId: session.user?.id };
    
    if (!payload.auteurId) throw new Error("Impossible de déterminer l'auteur (session invalide).");

    const result = await createContenu(payload);
    if (result.success) revalidatePath("/admin/content");
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateContenuAction(id: number, data: any) {
  try {
    const session = await checkAdmin();
    // Pour la mise à jour, on peut soit garder l'auteur original, 
    // soit mettre à jour avec l'admin qui modifie. 
    // Généralement, on garde l'auteur original sauf si spécifié autrement.
    // Ici, on va simplement s'assurer que l'auteurId n'est pas modifiable arbitrairement depuis le client.
    const { auteurId, ...rest } = data; 
    
    const result = await updateContenu(id, rest);
    if (result.success) revalidatePath("/admin/content");
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateContenuStatusAction(id: number, statut: string) {
  try {
    await checkAdmin();
    const result = await updateContenuStatus(id, statut);
    if (result.success) revalidatePath("/admin/content");
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteContenuAction(id: number) {
  try {
    await checkAdmin();
    const result = await deleteContenu(id);
    if (result.success) revalidatePath("/admin/content");
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 2. Actions pour les Catégories
export async function getAllCategoriesAction() {
  try {
    // Les catégories peuvent être lues par tout le monde potentiellement, 
    // mais ici on restreint au back-office par défaut
    await checkAdmin();
    return await fetchAllCategories();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createCategorieAction(data: any) {
  try {
    await checkAdmin();
    const result = await createCategorie(data);
    if (result.success) revalidatePath("/admin/content"); // Ou une page dédiée aux catégories si elle existe
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategorieAction(id: number, data: any) {
  try {
    await checkAdmin();
    const result = await updateCategorie(id, data);
    if (result.success) revalidatePath("/admin/content");
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategorieAction(id: number) {
  try {
    await checkAdmin();
    const result = await deleteCategorie(id);
    if (result.success) revalidatePath("/admin/content");
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
