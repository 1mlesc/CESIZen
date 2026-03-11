// components/home/FeaturedArticles.tsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, Tag } from "lucide-react";

interface Contenu {
  id: number;
  title: string;
  corps: string;
  type: string;
  statut: string;
  date_publication?: Date | null;
  createdAt: Date;
  categories: { id: number; name: string }[];
}

const FeaturedArticles = ({ articles }: { articles: Contenu[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 350;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  if (!articles || articles.length === 0) {
    return null; // On ne l'affiche pas s'il n'y a pas d'articles
  }

  return (
    <section className="py-24 bg-gray-50/50" id="article">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-gray-900 leading-tight">Derniers Articles</h2>
            <p className="text-gray-500 mt-4 text-lg">Découvrez nos derniers conseils et guides pour votre bien-être au quotidien.</p>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="min-w-[320px] md:min-w-[400px] bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 snap-center flex flex-col group overflow-hidden"
            >
              <div className="h-56 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden flex items-center justify-center">
                <FileText className="w-16 h-16 text-blue-200 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {article.categories.map((cat) => (
                    <span key={cat.id} className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-sm text-[10px] font-black text-blue-600 uppercase tracking-widest border border-white/20">
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(article.date_publication || article.createdAt).toLocaleDateString("fr-FR", {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3 grow">
                  {article.corps.replace(/<[^>]*>?/gm, '')}
                </p>
                <Link
                  href={`/contenu/${article.id}`}
                  className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-gray-50 text-gray-900 font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 gap-2"
                >
                  Lire l&apos;article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// Import de l'icône manquante
import { FileText } from "lucide-react";

export default FeaturedArticles;