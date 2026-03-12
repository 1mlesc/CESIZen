"use client";
import React, { useState, useRef } from "react";
import { updatePasswordAction } from "@/actions/userAction";
import { Loader2, Lock } from "lucide-react";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const target = e.target as typeof e.target & {
        currentPassword: { value: string };
        newPassword: { value: string };
        confirmPassword: { value: string };
    };

    const formData = {
      currentPassword: target.currentPassword.value,
      newPassword: target.newPassword.value,
      confirmPassword: target.confirmPassword.value,
    };

    const res = await updatePasswordAction(formData);
    
    if (res.error) {
        setMessage("❌ " + res.error);
    } else {
        setMessage("✅ " + res.message);
        if (formRef.current) {
          formRef.current.reset(); // On vide le formulaire si succès
        }
    }
    setLoading(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Lock className="w-5 h-5 text-gray-400"/> Sécurité
      </h2>

      <div>
        <label className="text-sm font-medium text-gray-600">Mot de passe actuel</label>
        <input type="password" name="currentPassword" className="w-full p-2 border rounded-lg mt-1" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
            <label className="text-sm font-medium text-gray-600">Nouveau mot de passe</label>
            <input type="password" name="newPassword" className="w-full p-2 border rounded-lg mt-1" required />
            <div className="text-[10px] text-gray-500 mt-2 grid grid-cols-2 gap-y-1 gap-x-2 px-1">
              <div className="flex items-center gap-1 col-span-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>12 caractères min.</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Une majuscule</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Une minuscule</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Un chiffre</span>
              </div>
              <div className="flex items-center gap-1 col-span-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Un caractère spécial</span>
              </div>
            </div>
        </div>
        <div>
            <label className="text-sm font-medium text-gray-600">Confirmer</label>
            <input type="password" name="confirmPassword" className="w-full p-2 border rounded-lg mt-1" required />
        </div>
      </div>

      <div className="pt-2">
         {message && <p className="text-sm mb-2 font-medium">{message}</p>}
         <button disabled={loading} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black disabled:opacity-50">
            {loading ? "Modification..." : "Changer le mot de passe"}
         </button>
      </div>
    </form>
  );
}