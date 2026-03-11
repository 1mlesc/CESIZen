"use client";

import React, { useState } from "react";
import { Settings2, Play, Clock, Wind, ArrowDown, ArrowUp, CircleSlash } from "lucide-react";
import BreathingModal from "./BreathingModal";

export default function CustomExerciceForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [config, setConfig] = useState({
    duree: 60,
    rythme_inspiration: 4,
    rythme_apnee: 4,
    rythme_expiration: 4
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Settings2 className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Exercice Personnalisé</h3>
            <p className="text-sm text-gray-500">Configurez votre propre rythme respiratoire</p>
          </div>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ArrowDown className="w-5 h-5 text-gray-400" />
        </div>
      </button>

      {isOpen && (
        <form onSubmit={handleStart} className="p-6 border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Durée totale */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" /> Durée totale (sec)
              </label>
              <input
                type="number"
                name="duree"
                min="10"
                max="600"
                value={config.duree}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Inspiration */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-blue-500" /> Inspiration (sec)
              </label>
              <input
                type="number"
                name="rythme_inspiration"
                min="1"
                max="20"
                step="0.5"
                value={config.rythme_inspiration}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Apnée */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CircleSlash className="w-4 h-4 text-purple-500" /> Apnée (sec)
              </label>
              <input
                type="number"
                name="rythme_apnee"
                min="0"
                max="20"
                step="0.5"
                value={config.rythme_apnee}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Expiration */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ArrowDown className="w-4 h-4 text-green-500" /> Expiration (sec)
              </label>
              <input
                type="number"
                name="rythme_expiration"
                min="1"
                max="20"
                step="0.5"
                value={config.rythme_expiration}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              Lancer ma séance
            </button>
          </div>
        </form>
      )}

      {showModal && (
        <BreathingModal 
          exercice={{...config, id: "custom"}} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}