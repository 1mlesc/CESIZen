"use client";

import React, { useState } from "react";
import { Clock, Wind, ArrowUp, ArrowDown, CircleSlash, Edit2, Trash2, Plus, Search } from "lucide-react";
import ExerciceModal from "./ExerciceModal";
import { adminDeleteExerciceAction } from "@/actions/exerciceActions";

export default function ExerciceTable({ initialExercices }: { initialExercices: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercice, setEditingExercice] = useState<any>(null);

  const filteredExercices = initialExercices.filter(exo => {
    return exo.duree.toString().includes(searchTerm) || 
           exo.rythme_inspiration.toString().includes(searchTerm);
  });

  const handleEdit = (exo: any) => {
    setEditingExercice(exo);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingExercice(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet exercice ?")) {
      const result = await adminDeleteExerciceAction(id);
      if (!result.success) alert(result.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exercices Respiratoires</h1>
          <p className="text-gray-500 text-sm mt-1">Configurez les séances de respiration disponibles pour les utilisateurs.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-bold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvel exercice
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher par durée ou rythme..." 
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}

            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Table des exercices */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Durée Totale</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Inspiration</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Apnée</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Expiration</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredExercices.map((exo: any) => (
                <tr key={exo.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-gray-900">{exo.duree} secondes</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <ArrowUp className="w-4 h-4" />
                      {exo.rythme_inspiration}s
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-purple-600 font-medium">
                      <CircleSlash className="w-4 h-4" />
                      {exo.rythme_apnee}s
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <ArrowDown className="w-4 h-4" />
                      {exo.rythme_expiration}s
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => handleEdit(exo)}
                        title="Éditer" 
                        className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(exo.id)}
                        title="Supprimer" 
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredExercices.length === 0 && (
            <div className="p-12 text-center text-gray-500 italic">
              Aucun exercice configuré.
            </div>
          )}
        </div>
      </div>

      <ExerciceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        exercice={editingExercice} 
      />
    </div>
  );
}