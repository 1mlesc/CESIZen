"use client";

import React, { useState } from "react";
import { Mail, Calendar, Shield, Edit2, Trash2, Search, Plus, Power } from "lucide-react";
import UserModal from "./UserModal";
import { adminDeleteUserAction, adminUpdateUserAction } from "@/actions/userAction";

export default function UserTable({ initialUsers }: { initialUsers: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Tous les rôles");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const filteredUsers = initialUsers.filter(u => {
    const matchesSearch = 
      `${u.first_name} ${u.family_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "Tous les rôles" || u.role?.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) {
      const result = await adminDeleteUserAction(id);
      if (!result.success) alert(result.error);
    }
  };

  const handleToggleStatus = async (user: any) => {
    const newStatus = user.statut === "ON" ? "OFF" : "ON";
    const result = await adminUpdateUserAction(user.id, { statut: newStatus });
    if (!result.success) alert(result.error);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez les comptes et les accès des membres CESIZen.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-bold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvel utilisateur
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher par nom, email..." 
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}

            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
          />
        </div>
        <select 
          value={selectedRole}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRole(e.target.value)}
          className="px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option>Tous les rôles</option>
          <option>ADMIN</option>
          <option>USER</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date inscription</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u: any) => (
                <tr key={u.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border ${
                        u.statut === "ON" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-gray-100 text-gray-400 border-gray-200"
                      }`}>
                        {u.first_name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className={`font-bold ${u.statut === "ON" ? "text-gray-900" : "text-gray-400 italic"}`}>
                          {u.first_name} {u.family_name}
                          {u.statut === "OFF" && " (Inactif)"}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter">ID: {u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {u.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      u.role?.role === "ADMIN" 
                        ? "bg-purple-50 text-purple-700 border-purple-100" 
                        : "bg-blue-50 text-blue-700 border-blue-100"
                    }`}>
                      <Shield className="w-3 h-3" />
                      {u.role?.role || "USER"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => handleToggleStatus(u)}
                        title={u.statut === "ON" ? "Désactiver" : "Activer"}
                        className={`p-2 rounded-lg border border-transparent transition-all ${
                          u.statut === "ON" ? "text-green-500 hover:bg-green-50" : "text-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <Power className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(u)}
                        title="Éditer" 
                        className="p-2 hover:bg-blue-50 rounded-lg border border-transparent text-gray-400 hover:text-blue-600 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)}
                        title="Supprimer" 
                        className="p-2 hover:bg-red-50 rounded-lg border border-transparent text-gray-400 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center text-gray-500 italic">
              Aucun utilisateur trouvé pour cette recherche.
            </div>
          )}
        </div>
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={editingUser} 
      />
    </div>
  );
}