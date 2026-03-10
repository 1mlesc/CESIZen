import { getAllContenusAction, getAllCategoriesAction } from "@/actions/contenuActions";
import ContenuTable from "@/app/components/dashboard/back-office/ContenuTable";

export default async function AdminContentPage() {
  // Récupération de toutes les données en parallèle
  const [contenusResult, categoriesResult] = await Promise.all([
    getAllContenusAction(),
    getAllCategoriesAction(),
  ]);

  const contenus = contenusResult.success ? contenusResult.data : [];
  const categories = categoriesResult.success ? categoriesResult.data : [];

  return (
    <ContenuTable 
      initialContenus={contenus} 
      categories={categories} 
    />
  );
}
