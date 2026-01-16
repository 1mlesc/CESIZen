"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  
  // État global du formulaire passé aux étapes
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Fonction générique pour mettre à jour n'importe quel champ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Validation simple avant de passer à l'étape 2
    if(formData.firstName && formData.lastName && formData.birthDate) {
        setStep(2);
    } else {
        alert("Merci de remplir tous les champs");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoi des données
   //TODO
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Bouton retour */}
      {step === 2 && (
        <button 
          onClick={() => setStep(1)}
          className="absolute -top-12 left-0 text-gray-500 hover:text-green-600 flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
      )}

      {/* En-tête dynamique */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {step === 1 ? "Faisons connaissance" : "Sécurisez votre compte"}
        </h1>
        <p className="text-gray-500 mt-2">
          {step === 1 
            ? "Quelques informations pour personnaliser votre expérience." 
            : "Dernière étape pour rejoindre la communauté."}
        </p>
        
        {/* Barre de progression */}
        <div className="flex justify-center gap-2 mt-4">
          <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? "w-8 bg-green-600" : "w-2 bg-gray-200"}`}></div>
          <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? "w-8 bg-green-600" : "w-2 bg-gray-200"}`}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Affichage conditionnel des composants */}
        {step === 1 && (
            <SignupStep1 
                formData={formData} 
                handleChange={handleChange} 
                onNext={handleNext} 
            />
        )}

        {step === 2 && (
            <SignupStep2 
                formData={formData} 
                handleChange={handleChange} 
            />
        )}

      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link href="/auth/login" className="font-semibold text-green-600 hover:text-green-500 hover:underline transition-colors">
            Se connecter
          </Link>
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          En vous inscrivant, vous acceptez nos <Link href="/cgu" className="underline">Conditions Générales</Link> et notre <Link href="/confidentialite" className="underline">Politique de Confidentialité</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignupForm;