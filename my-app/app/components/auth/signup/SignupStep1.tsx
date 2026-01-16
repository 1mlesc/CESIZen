import React from "react";
import { User, Calendar, ArrowRight } from "lucide-react";

const SignupStep1 = ({ formData, handleChange, onNext }) => {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
      {/* Prénom et Nom */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Prénom</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Jean"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none"
              required
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Nom</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Dupont"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none"
              required
            />
          </div>
        </div>
      </div>

      {/* Date de naissance */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Date de naissance</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none text-gray-600"
            required
          />
        </div>
      </div>

      {/* Bouton SUIVANT */}
      <button
        type="button"
        onClick={onNext}
        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5"
      >
        Suivant <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

export default SignupStep1;