"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, X, Loader2 } from "lucide-react";
import { saveSessionAction } from "@/actions/exerciceActions";

export default function BreathingModal({ exercice, onClose }) {
  const [timeLeft, setTimeLeft] = useState(exercice.duree);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [phase, setPhase] = useState("Prêt ?"); 
  const [scale, setScale] = useState(1);
  
  const timerRef = useRef(null);
  
  // Constantes du cycle
  const tInsp = exercice.rythme_inspiration;
  const tApnee = exercice.rythme_apnee;
  const tExp = exercice.rythme_expiration;
  const cycleTime = tInsp + tApnee + tExp;

  // Calcul du contour du cercle pour la jauge de temps global
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = ((exercice.duree - timeLeft) / exercice.duree) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = Math.max(prev - 0.05, 0); // Maj 20 fois par seconde pour une fluidité parfaite

          if (newTime <= 0) {
            handleComplete();
            return 0;
          }

          // Déterminer la phase et l'échelle (animation respiratoire)
          const elapsed = exercice.duree - newTime;
          const currentCycleTime = elapsed % cycleTime;

          if (currentCycleTime < tInsp) {
            setPhase("Inspirez");
            // Grossit de 1 à 1.5
            setScale(1 + 0.5 * (currentCycleTime / tInsp));
          } else if (currentCycleTime < tInsp + tApnee) {
            setPhase("Maintenez");
            setScale(1.5); // Reste bloqué au max
          } else {
            setPhase("Expirez");
            // Rétrécit de 1.5 à 1
            const expElapsed = currentCycleTime - tInsp - tApnee;
            setScale(1.5 - 0.5 * (expElapsed / tExp));
          }

          return newTime;
        });
      }, 50); // Intervalle très court pour rendre l'animation fluide
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => setIsPaused(true);

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(exercice.duree);
    setPhase("Prêt ?");
    setScale(1);
  };

  const handleComplete = async () => {
    setIsActive(false);
    setPhase("Terminé !");
    setScale(1);
    clearInterval(timerRef.current);
    setIsSaving(true);
    
    // Enregistrement strict uniquement si l'exercice est allé au bout
    await saveSessionAction(exercice.id);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Bouton de fermeture */}
        <button 
          onClick={onClose} 
          disabled={isActive && !isPaused} // Empêche de fermer par erreur pendant l'action
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 text-center flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-8">Exercice en cours</h2>

          {/* ZONE D'ANIMATION */}
          <div className="relative flex items-center justify-center w-72 h-72">
            
            {/* Le poumon central (Cercle plein qui respire) */}
            <div 
              className="absolute bg-green-100 rounded-full transition-transform ease-linear"
              style={{ 
                width: '160px', 
                height: '160px', 
                transform: `scale(${scale})` 
              }}
            />

            {/* Jauge du temps total (Anneau extérieur) */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="144" cy="144" r={radius}
                className="stroke-gray-100" strokeWidth="8" fill="transparent"
              />
              <circle
                cx="144" cy="144" r={radius}
                className="stroke-green-500 transition-all duration-75 ease-linear"
                strokeWidth="8" fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Compteur et Texte */}
            <div className="absolute flex flex-col items-center justify-center z-10">
              <span className="text-5xl font-black text-gray-900 drop-shadow-sm">
                {Math.ceil(timeLeft)}
              </span>
              <span className={`text-lg font-bold mt-1 tracking-wide uppercase ${
                 phase === "Inspirez" ? "text-blue-600" : phase === "Expirez" ? "text-green-600" : "text-gray-600"
              }`}>
                {phase}
              </span>
            </div>
          </div>

          {/* CONTRÔLES */}
          <div className="flex items-center gap-6 mt-12 h-16">
            {isSaving ? (
              <div className="flex items-center text-green-600 font-medium">
                <Loader2 className="animate-spin w-5 h-5 mr-2" /> Enregistrement...
              </div>
            ) : (
              <>
                {!isActive || isPaused ? (
                  <button onClick={handleStart} className="p-4 bg-gray-900 text-white rounded-full hover:bg-black transition-transform hover:scale-105">
                    <Play className="w-7 h-7 ml-1" />
                  </button>
                ) : (
                  <button onClick={handlePause} className="p-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-transform hover:scale-105">
                    <Pause className="w-7 h-7" />
                  </button>
                )}
                
                <button 
                  onClick={handleStop} 
                  disabled={!isActive && timeLeft === exercice.duree} 
                  className="p-4 bg-gray-100 text-gray-600 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Square className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}