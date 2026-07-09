// components/home/HeroSection.jsx
import React from "react";
import Link from "next/link";
import { Leaf, Heart, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-green-50/50 py-16 pt-32 sm:py-24 sm:pt-40 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* En-tête principal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Retrouvez l&apos;équilibre avec{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-green-700">
                  CESI
                </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-400">
                  Zen
                </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Une application conçue <strong>par les étudiants, pour les étudiants et le personnel</strong>. 
            Notre objectif ? Vous offrir un espace de déconnexion pour mieux gérer le stress, 
            améliorer votre concentration et cultiver votre bien-être au quotidien.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="#exercices"
              className="px-8 py-3 rounded-full bg-red-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:-translate-y-1 transition-all duration-200"
            >
              Commencer maintenant
            </Link>
            <Link
              href="#article"
              className="px-8 py-3 rounded-full bg-white text-green-600 border border-green-200 font-semibold shadow-sm hover:bg-green-50 transition-all duration-200"
            >
              En savoir plus
            </Link>
          </div>
        </div>

        {/* Les 3 piliers (Comment/Pourquoi) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Carte 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-xs border border-green-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Respiration & Calme</h3>
            <p className="text-gray-500">
              Des exercices guidés pour apaiser votre rythme cardiaque et réduire l&apos;anxiété instantanément.
            </p>
          </div>

          {/* Carte 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-xs border border-yellow-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bienveillance</h3>
            <p className="text-gray-500">
              Un contenu pensé pour vous accompagner sans jugement, à votre rythme, où que vous soyez.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-xs border border-blue-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Conseils Fiables</h3>
            <p className="text-gray-500">
              Des articles et astuces validés pour comprendre les mécanismes du stress et mieux les dompter.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;