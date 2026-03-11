"use client";

import React, { useState } from "react";
import BreathingModal from "./BreathingModal";
import { PlayCircle, Clock, Wind } from "lucide-react";

export default function ExerciceCard({ exercice }: { exercice: any }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <Wind className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 mr-1.5" />
              {exercice.duree} sec
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Respiration Rythmée</h3>
          <p className="text-gray-500 text-sm mb-6">
            Inspiration : {exercice.rythme_inspiration}s • Apnée : {exercice.rythme_apnee}s • Expiration : {exercice.rythme_expiration}s
          </p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition-colors font-medium"
        >
          <PlayCircle className="w-5 h-5" />
          Démarrer l&apos;exercice
        </button>
      </div>

      {showModal && (
        <BreathingModal 
          exercice={exercice} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}