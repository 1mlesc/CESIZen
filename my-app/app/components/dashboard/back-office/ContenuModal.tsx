"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, FileText, User, Tag, Calendar, CheckSquare, List } from "lucide-react";
import { createContenuAction, updateContenuAction } from "@/actions/contenuActions";

interface ContenuModalProps {
  contenu?: any;
  categories: any[];
  onClose: () => void;
  isOpen: boolean;
}

export default function ContenuModal({ contenu, categories, onClose, isOpen }: ContenuModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    corps: "",
    type: "ARTICLE",
    statut: "DRAFT",
    date_publication: "",
    categoryIds: [] as number[]
  });

  useEffect(() => {
    if (contenu) {
      setFormData({
        title: contenu.title || "",
        corps: contenu.corps || "",
        type: contenu.type || "ARTICLE",
        statut: contenu.statut || "DRAFT",
        date_publication: contenu.date_publication ? new Date(contenu.date_publication).toISOString().split('T')[0] : "",
        categoryIds: contenu.categories?.map((c: any) => c.id) || []
      });
    } else {
      setFormData({
        title: "",
        corps: "",
        type: "ARTICLE",
        statut: "DRAFT",
        date_publication: "",
        categoryIds: []
      });
    }
  }, [contenu]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let result;
    if (contenu) {
      result = await updateContenuAction(contenu.id, formData);
    } else {
      result = await createContenuAction(formData);
    }

    if (result.success) {
      onClose();
    } else {
      alert(result.error || "Une erreur est survenue");
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (id: number) => {
    setFormData(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter(cid => cid !== id)
        : [...prev.categoryIds, id]
    }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">
            {contenu ? "Modifier le contenu" : "Nouveau contenu"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" /> Titre de l'article
            </label>
            <input
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ex: Les bienfaits de la respiration"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <List className="w-4 h-4 text-gray-400" /> Corps du contenu
            </label>
            <textarea
              required
              name="corps"
              value={formData.corps}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              placeholder="Écrivez votre article ici..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" /> Date de publication (optionnel)
              </label>
              <input
                type="date"
                name="date_publication"
                value={formData.date_publication}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Type de contenu</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              >
                <option value="ARTICLE">Article</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" /> Catégories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryToggle(cat.id)}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all flex items-center gap-2 ${
                    formData.categoryIds.includes(cat.id)
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                      : "bg-white border-gray-200 text-gray-600 hover:border-blue-400"
                  }`}
                >
                  {formData.categoryIds.includes(cat.id) && <CheckSquare className="w-4 h-4" />}
                  {cat.name}
                </button>
              ))}
            </div>
            {formData.categoryIds.length === 0 && (
              <p className="text-xs text-red-500 italic">Veuillez sélectionner au moins une catégorie.</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Statut</label>
            <select 
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
            >
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Annuler
            </button>
            <button
              disabled={loading || formData.categoryIds.length === 0}
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {contenu ? "Enregistrer les modifications" : "Créer l'article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}