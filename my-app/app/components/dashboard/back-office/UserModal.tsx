"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, Shield, Mail, User, Calendar, Lock } from "lucide-react";
import { adminCreateUserAction, adminUpdateUserAction } from "@/actions/userAction";

interface UserModalProps {
  user?: any;
  onClose: () => void;
  isOpen: boolean;
}

export default function UserModal({ user, onClose, isOpen }: UserModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    family_name: "",
    email: "",
    password: "",
    birthdate: "",
    role: "USER",
    statut: "ON"
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        family_name: user.family_name || "",
        email: user.email || "",
        password: "", // On ne charge pas le mot de passe
        birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : "",
        role: user.role?.role || "USER",
        statut: user.statut || "ON"
      });
    } else {
      setFormData({
        first_name: "",
        family_name: "",
        email: "",
        password: "",
        birthdate: "",
        role: "USER",
        statut: "ON"
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let result;
    if (user) {
      // Pour l'update, on ne change le rôle que si nécessaire via un ID ou champ spécifique
      // Ici on simplifie en envoyant les données au controller adminUserUpdate
      result = await adminUpdateUserAction(user.id, formData);
    } else {
      result = await adminCreateUserAction(formData);
    }

    if (result.success) {
      onClose();
    } else {
      alert(result.error || "Une erreur est survenue");
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">
            {user ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" /> Prénom
              </label>
              <input
                required
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ex: Jean"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Nom</label>
              <input
                required
                name="family_name"
                value={formData.family_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ex: Dupont"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" /> Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="jean.dupont@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" /> Date de naissance
              </label>
              <input
                required
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" /> Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={user ? "Laisser vide pour ne pas changer" : "••••••••"}
                required={!user}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" /> Rôle
              </label>
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              >
                <option value="USER">Utilisateur</option>
                <option value="ADMIN">Administrateur</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Statut</label>
              <select 
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              >
                <option value="ON">Actif (ON)</option>
                <option value="OFF">Inactif (OFF)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Annuler
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {user ? "Enregistrer" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}