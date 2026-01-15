// components/home/ExercisesList.jsx
import React from "react";
import Link from "next/link";
import { Timer, Wind, Play } from "lucide-react";

const ExercisesList = () => {
  return (
    <section id="exercices" className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Vos Exercices</h2>
          <p className="text-gray-500 mt-2">
            Des outils pratiques pour agir immédiatement sur votre état d&apos;esprit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* CARTE EXERCICE RESPIRATOIRE */}
          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            {/* Décoration de fond */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wind className="w-24 h-24 text-green-500" />
            </div>

            <div className="p-8">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Timer className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Exercice Respiratoire
              </h3>
              <p className="text-gray-500 mb-6">
                Une technique de respiration simple pour calmer le stress et l&apos;anxiété en quelques minutes.
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
                <span className="flex items-center gap-1">
                  <Timer className="w-4 h-4" /> 5 min
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-4 h-4" /> Facile
                </span>
              </div>

              <Link
                href="/ex-respiratoire"
                className="w-full text-center py-3 rounded-xl bg-gray-900 text-white font-semibold group-hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Lancer la séance
              </Link>
            </div>
          </div>

          {/* PLACEHOLDER POUR FUTURS EXERCICES (Optionnel, montre qu'il y en aura d'autres) */}
          <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-gray-400 min-h-75">
            <span className="text-lg font-medium">Bientôt disponible</span>
            <p className="text-sm mt-2">Nouveaux exercices en préparation...</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExercisesList;