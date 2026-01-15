// components/home/FeaturedArticles.jsx
"use client"; // Nécessaire car on utilise useRef pour les boutons

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const FeaturedArticles = () => {
  const scrollContainerRef = useRef(null);

  // Fausses données pour l'instant
  const articles = [
    {
      id: 1,
      title: "Comprendre le stress des examens",
      excerpt: "Pourquoi notre corps réagit-il ainsi avant une épreuve ? Décryptage et solutions.",
      category: "Comprendre",
      date: "12 Oct, 2024",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      title: "5 minutes pour souffler",
      excerpt: "Pas le temps ? Voici des micro-pauses à faire entre deux cours.",
      category: "Pratique",
      date: "08 Oct, 2024",
      color: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      title: "L'importance du sommeil",
      excerpt: "Dormir moins pour réviser plus ? Mauvaise idée. Voici pourquoi.",
      category: "Santé",
      date: "01 Oct, 2024",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 4,
      title: "La cohérence cardiaque",
      excerpt: "Tout savoir sur cette technique simple qui révolutionne la gestion du stress.",
      category: "Technique",
      date: "28 Sept, 2024",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  // Fonction pour faire défiler
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 350; // Largeur d'une carte + marge
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-16 bg-white" id="article">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre + Boutons de navigation */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Derniers Articles</h2>
            <p className="text-gray-500 mt-2">Nos conseils pour mieux vivre votre scolarité.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-green-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-green-300 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Container du Swiper (Scroll Horizontal) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Cache la barre de scroll
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="min-w-75 md:min-w-87.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 snap-center flex flex-col"
            >
              {/* Image Placeholder (Grise pour l'instant) */}
              <div className="h-48 bg-gray-200 rounded-t-2xl animate-pulse"></div>
              
              <div className="p-6 flex flex-col grow">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${article.color}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 grow">
                  {article.excerpt}
                </p>
                <Link
                  href={`/blog/${article.id}`}
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 mt-auto"
                >
                  Lire l&apos;article <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedArticles;