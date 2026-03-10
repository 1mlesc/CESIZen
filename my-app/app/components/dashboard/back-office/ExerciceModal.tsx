"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, Clock, Wind, ArrowUp, ArrowDown, CircleSlash } from "lucide-react";
import { adminCreateExerciceAction, adminUpdateExerciceAction } from "@/actions/exerciceActions";

interface ExerciceModalProps {
  exercice?: any;
  onClose: () => void;
  isOpen: boolean;
}

export default function ExerciceModal({ exercice, onClose, isOpen }: ExerciceModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    duree: 60,
    rythme_inspiration: 4,
    rythme_apnee: 4,
    rythme_expiration: 4
  });

  useEffect(() => {
    if (exercice) {
      setFormData({
        duree: exercice.duree,
        rythme_inspiration: exercice.rythme_inspiration,
        rythme_apnee: exercice.rythme_apnee,
        rythme_expiration: exercice.rythme_expiration
      });
    } else {
      setFormData({
        duree: 60,
        rythme_inspiration: 4,
        rythme_apnee: 4,
        rythme_expiration: 4
      });
    }
  }, [exercice]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let result;
    if (exercice) {
      result = await adminUpdateExerciceAction(exercice.id, formData);
    } else {
      result = await adminCreateExerciceAction(formData);
    }

    if (result.success) {
      onClose();
    } else {
      alert(result.error || "Une erreur est survenue");
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">
            {exercice ? "Modifier l'exercice" : "Ajouter un exercice"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" /> Durée totale (secondes)
            </label>
            <input
              required
              type="number"
              name="duree"
              min="10"
              max="600"
              value={formData.duree}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-blue-500" /> Inspiration
              </label>
              <input
                required
                type="number"
                name="rythme_inspiration"
                step="0.5"
                min="1"
                value={formData.rythme_inspiration}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CircleSlash className="w-4 h-4 text-purple-500" /> Apnée
              </label>
              <input
                required
                type="number"
                name="rythme_apnee"
                step="0.5"
                min="0"
                value={formData.rythme_apnee}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ArrowDown className="w-4 h-4 text-green-500" /> Expiration
              </label>
              <input
                required
                type="number"
                name="rythme_expiration"
                step="0.5"
                min="1"
                value={formData.rythme_expiration}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 space-y-2">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Résumé du cycle</p>
            <p className="text-sm text-blue-600">
              Chaque cycle durera {formData.rythme_inspiration + formData.rythme_apnee + formData.rythme_expiration} secondes.
              L'exercice comportera environ {Math.round(formData.duree / (formData.rythme_inspiration + formData.rythme_apnee + formData.rythme_expiration))} cycles complets.
            </p>
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
              {exercice ? "Enregistrer" : "Créer l'exercice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}