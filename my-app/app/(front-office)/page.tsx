// app/page.js
import HeroSection from "../components/home/HeroSection";
import FeaturedArticles from "../components/home/FeaturedArticles";
import ExercisesList from "../components/home/ExercicesList";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Section Introduction & Contexte */}
      <HeroSection />

      {/* 2. Section Exercices (Mis en avant pour l'accès rapide) */}
      <ExercisesList />

      {/* 3. Section Articles (Blog/Conseils) */}
      <FeaturedArticles />

    </div>
  );
}