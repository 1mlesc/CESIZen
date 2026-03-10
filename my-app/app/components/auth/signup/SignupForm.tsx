"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";

import { signupAction } from "@/actions/authActions";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // État global du formulaire passé aux étapes
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  // Fonction générique pour mettre à jour n'importe quel champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Validation simple avant de passer à l'étape 2
    if(formData.first_name && formData.last_name && formData.birth_date) {
        setStep(2);
    } else {
        alert("Merci de remplir tous les champs");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Envoi des données
    setLoading(true);
    setError("");

    try {
      const response = await signupAction(formData);
      if (response?.error) {
        setError(response.error + " statut : " + response.statusCode);
      }
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer. statut " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative">

      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-xl">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}

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

      {/* --- AFFICHAGE DE L'ERREUR --- */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

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