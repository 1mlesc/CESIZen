"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getUserStatsAction } from "@/actions/exerciceActions";
import { Clock, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

export default function ExerciceStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getUserStatsAction();
      if (res.success) {
        setStats(res.data);
        setError(null);
      } else {
        // Affiche l'erreur précise du serveur
        setError(res.error || "Une erreur inconnue est survenue.");
      }
    } catch (err) {
      setError("Échec de la communication avec le serveur.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
    
    window.addEventListener("refreshStats", loadStats);
    return () => window.removeEventListener("refreshStats", loadStats);
  }, [loadStats]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 mb-8 flex items-center gap-3">
        <AlertCircle className="w-5 h-5" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  if (!stats || stats.totalSessions === 0) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center mb-8">
        <p className="text-gray-500 font-medium">Commencez votre premier exercice pour voir vos statistiques !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Total Sessions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-xl">
          <CheckCircle2 className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Sessions complétées</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
        </div>
      </div>

      {/* Total Duration */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-green-50 rounded-xl">
          <Clock className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Temps total</p>
          <p className="text-2xl font-bold text-gray-900">{Math.round(stats.totalDuration / 60)} min</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-purple-50 rounded-xl">
          <Calendar className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">7 derniers jours</p>
          <p className="text-2xl font-bold text-gray-900">{stats.recentCount} sessions</p>
        </div>
      </div>
    </div>
  );
}