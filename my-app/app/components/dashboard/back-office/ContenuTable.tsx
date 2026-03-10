"use client";

import React, { useState } from "react";
import { FileText, Calendar, Tag, Edit2, Trash2, Search, Plus, Eye, CheckCircle, Clock, Archive } from "lucide-react";
import ContenuModal from "./ContenuModal";
import { deleteContenuAction, updateContenuStatusAction } from "@/actions/contenuActions";

const STATUS_CONFIG: Record<string, { label: string, color: string, icon: any }> = {
  PUBLISHED: { label: "Publié", color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  DRAFT: { label: "Brouillon", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  ARCHIVED: { label: "Archivé", color: "bg-gray-100 text-gray-600 border-gray-200", icon: Archive },
};

export default function ContenuTable({ 
  initialContenus, 
  categories
}: { 
  initialContenus: any[], 
  categories: any[]
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tous les statuts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContenu, setEditingContenu] = useState<any>(null);

  const filteredContenus = initialContenus.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.corps.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "Tous les statuts" || c.statut === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (contenu: any) => {
    setEditingContenu(contenu);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingContenu(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?")) {
      const result = await deleteContenuAction(id);
      if (!result.success) alert(result.error);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    const result = await updateContenuStatusAction(id, newStatus);
    if (!result.success) alert(result.error);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Contenus</h1>
          <p className="text-gray-500 text-sm mt-1">Articles, guides et actualités de la plateforme.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-bold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouveau contenu
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher par titre, contenu..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
          />
        </div>
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option>Tous les statuts</option>
          <option value="PUBLISHED">Publié</option>
          <option value="DRAFT">Brouillon</option>
          <option value="ARCHIVED">Archivé</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Titre / Auteur</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Catégories</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredContenus.map((c: any) => {
                const status = STATUS_CONFIG[c.statut] || STATUS_CONFIG.DRAFT;
                const StatusIcon = status.icon;

                return (
                  <tr key={c.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{c.title}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Par {c.auteur?.first_name} {c.auteur?.family_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {c.categories.map((cat: any) => (
                          <span key={cat.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-[10px] font-bold text-gray-600">
                            <Tag className="w-2.5 h-2.5" />
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={c.statut}
                        onChange={(e) => handleUpdateStatus(c.id, e.target.value)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border outline-none cursor-pointer transition-all ${status.color}`}
                      >
                        <option value="PUBLISHED">Publié</option>
                        <option value="DRAFT">Brouillon</option>
                        <option value="ARCHIVED">Archivé</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                        {c.date_publication && (
                          <span className="text-[10px] text-blue-500 font-medium mt-0.5">
                            Publié le {new Date(c.date_publication).toLocaleDateString("fr-FR")}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => handleEdit(c)}
                          title="Modifier" 
                          className="p-2 hover:bg-blue-50 rounded-lg border border-transparent text-gray-400 hover:text-blue-600 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(c.id)}
                          title="Supprimer" 
                          className="p-2 hover:bg-red-50 rounded-lg border border-transparent text-gray-400 hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredContenus.length === 0 && (
            <div className="p-12 text-center text-gray-500 italic">
              Aucun contenu trouvé.
            </div>
          )}
        </div>
      </div>

      <ContenuModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        contenu={editingContenu}
        categories={categories}
      />
    </div>
  );
}