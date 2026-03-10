import HeroSection from "../components/home/HeroSection";
import FeaturedArticles from "../components/home/FeaturedArticles";
import ExercisesList from "../components/home/ExercicesList";
import { getPublishedContenusAction } from "@/actions/contenuActions";

export default async function HomePage() {
  const result = await getPublishedContenusAction();
  const articles = result.success ? result.data : [];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Section Introduction & Contexte */}
      <HeroSection />

      {/* 2. Section Exercices (Mis en avant pour l'accès rapide) */}
      <ExercisesList />

      {/* 3. Section Articles (Blog/Conseils) */}
      <FeaturedArticles articles={articles} />

    </div>
  );
}