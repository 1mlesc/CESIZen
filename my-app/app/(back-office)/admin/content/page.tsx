import { getAllContenusAction, getAllCategoriesAction } from "@/actions/contenuActions";
import ContenuTable from "@/app/components/dashboard/back-office/ContenuTable";

export default async function AdminContentPage() {
  // Récupération de toutes les données en parallèle
  const [contenusResult, categoriesResult] = await Promise.all([
    getAllContenusAction(),
    getAllCategoriesAction(),
  ]);

  const contenus = (contenusResult.success && "data" in contenusResult && contenusResult.data) ? contenusResult.data : [];
  const categories = (categoriesResult.success && "data" in categoriesResult && categoriesResult.data) ? categoriesResult.data : [];

  return (
    <ContenuTable 
      initialContenus={contenus} 
      categories={categories} 
    />
  );
}
