import { getContenuByIdAction } from "@/actions/contenuActions";
import { notFound } from "next/navigation";
import { Calendar, User, Tag, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default async function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getContenuByIdAction(parseInt(id));

  if (!result.success || !("data" in result) || !result.data) {
    return notFound();
  }

  const contenu = result.data as any;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Fil d'ariane / Retour */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-12 group"
        >
          <div className="p-2 rounded-xl bg-white border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm">Retour à l'accueil</span>
        </Link>

        <article className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden">
          {/* Header de l'article */}
          <div className="p-8 md:p-16 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-100 relative overflow-hidden">
             {/* Décoration de fond */}
             <div className="absolute top-0 right-0 p-12 opacity-10">
                <FileText className="w-64 h-64 text-blue-600" />
             </div>

             <div className="relative z-10">
               <div className="flex flex-wrap gap-2 mb-8">
                {contenu.categories.map((cat: any) => (
                    <span key={cat.id} className="px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm text-xs font-black text-blue-600 uppercase tracking-widest border border-white/20">
                    {cat.name}
                    </span>
                ))}
               </div>
               
               <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.15] mb-8">
                {contenu.title}
               </h1>

               <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-blue-500 shadow-sm">
                        <User className="w-5 h-5" />
                    </div>
                    <span>Par <span className="text-gray-900 font-bold">{contenu.auteur.first_name} {contenu.auteur.family_name}</span></span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>
                    {new Date(contenu.date_publication || contenu.createdAt).toLocaleDateString("fr-FR", {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                    </span>
                </div>
               </div>
             </div>
          </div>

          {/* Corps de l'article */}
          <div className="p-8 md:p-16">
             <div className="prose prose-blue prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {contenu.corps}
             </div>
          </div>

          {/* Footer de l'article */}
          <div className="px-8 md:px-16 py-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Catégories :</span>
                <div className="flex gap-2 ml-2">
                    {contenu.categories.map((cat: any) => (
                        <span key={cat.id} className="text-sm text-gray-600 font-medium">#{cat.name}</span>
                    ))}
                </div>
             </div>
          </div>
        </article>

        {/* Section de fin */}
        <div className="mt-16 text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-6">Cet article vous a aidé ?</h3>
            <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
                Gérer mes exercices personnalisés
            </Link>
        </div>
      </div>
    </div>
  );
}
