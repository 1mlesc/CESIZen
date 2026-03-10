import { ContenuModel } from "@/models/Contenu";
import { CategorieModel } from "@/models/Categorie";
import { contenuSchema, updateStatusSchema, categorieSchema } from "@/schemas/admin/contenuSchema";

// 1. Gestion des contenus
export const fetchAllContenus = async () => {
  try {
    const contenus = await ContenuModel.getAll();
    return { success: true, data: contenus };
  } catch (error) {
    console.error("Fetch contenus error:", error);
    return { success: false, error: "Erreur lors de la récupération des contenus." };
  }
};

export const getContenuById = async (id: number) => {
  try {
    const contenu = await ContenuModel.getById(id);
    if (!contenu) return { success: false, error: "Contenu introuvable." };
    return { success: true, data: contenu };
  } catch (error) {
    console.error("Fetch contenu by id error:", error);
    return { success: false, error: "Erreur lors de la récupération du contenu." };
  }
};

export const createContenu = async (data: any) => {
  const validation = contenuSchema.safeParse(data);
  if (!validation.success) return { success: false, error: validation.error.issues[0].message };

  try {
    const newContenu = await ContenuModel.create({
      ...validation.data,
      date_publication: validation.data.date_publication ? new Date(validation.data.date_publication) : null,
    });
    return { success: true, data: newContenu };
  } catch (error) {
    console.error("Create contenu error:", error);
    return { success: false, error: "Erreur lors de la création du contenu." };
  }
};

export const updateContenu = async (id: number, data: any) => {
  const validation = contenuSchema.safeParse(data);
  if (!validation.success) return { success: false, error: validation.error.issues[0].message };

  try {
    const updatedContenu = await ContenuModel.update(id, {
      ...validation.data,
      date_publication: validation.data.date_publication ? new Date(validation.data.date_publication) : null,
    });
    return { success: true, data: updatedContenu };
  } catch (error) {
    console.error("Update contenu error:", error);
    return { success: false, error: "Erreur lors de la mise à jour du contenu." };
  }
};

export const updateContenuStatus = async (id: number, statut: any) => {
  const validation = updateStatusSchema.safeParse({ statut });
  if (!validation.success) return { success: false, error: validation.error.issues[0].message };

  try {
    await ContenuModel.updateStatus(id, validation.data.statut);
    return { success: true };
  } catch (error) {
    console.error("Update status error:", error);
    return { success: false, error: "Erreur lors du changement de statut." };
  }
};

export const deleteContenu = async (id: number) => {
  try {
    await ContenuModel.delete(id);
    return { success: true };
  } catch (error) {
    console.error("Delete contenu error:", error);
    return { success: false, error: "Erreur lors de la suppression du contenu." };
  }
};

// 2. Gestion des catégories
export const fetchAllCategories = async () => {
  try {
    const categories = await CategorieModel.getAll();
    return { success: true, data: categories };
  } catch (error) {
    console.error("Fetch categories error:", error);
    return { success: false, error: "Erreur lors de la récupération des catégories." };
  }
};

export const createCategorie = async (data: any) => {
  const validation = categorieSchema.safeParse(data);
  if (!validation.success) return { success: false, error: validation.error.issues[0].message };

  try {
    const newCategorie = await CategorieModel.create(validation.data.name);
    return { success: true, data: newCategorie };
  } catch (error) {
    console.error("Create categorie error:", error);
    return { success: false, error: "Erreur lors de la création de la catégorie." };
  }
};

export const updateCategorie = async (id: number, data: any) => {
  const validation = categorieSchema.safeParse(data);
  if (!validation.success) return { success: false, error: validation.error.issues[0].message };

  try {
    const updatedCategorie = await CategorieModel.update(id, validation.data.name);
    return { success: true, data: updatedCategorie };
  } catch (error) {
    console.error("Update categorie error:", error);
    return { success: false, error: "Erreur lors de la mise à jour de la catégorie." };
  }
};

export const deleteCategorie = async (id: number) => {
  try {
    await CategorieModel.delete(id);
    return { success: true };
  } catch (error) {
    console.error("Delete categorie error:", error);
    return { success: false, error: "Erreur lors de la suppression de la catégorie." };
  }
};
