"use client";
import React, { useState } from "react";
import { updateProfileAction } from "@/actions/userAction";
import { Loader2, Save } from "lucide-react";

export default function EditProfileForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      birthdate: { value: string };
    };

    const formData = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      birthdate: target.birthdate.value,
    };

    const res = await updateProfileAction(formData);
    if (res.error) setMessage("❌ " + res.error);
    else setMessage("✅ " + res.message);
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Mes informations</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Prénom</label>
          <input name="firstName" defaultValue={user.firstName} className="w-full p-2 border rounded-lg mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Nom</label>
          <input name="lastName" defaultValue={user.lastName} className="w-full p-2 border rounded-lg mt-1" />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-600">Email (non modifiable)</label>
          <input name="email" value={user.email} disabled className="w-full p-2 border rounded-lg mt-1 bg-gray-50 text-gray-400 cursor-not-allowed" />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-600">Date de naissance</label>
          <input name="birthdate" type="date" defaultValue={user.birthdate} className="w-full p-2 border rounded-lg mt-1" />
        </div>
      </div>

      <div className="pt-2">
         {message && <p className="text-sm mb-2 font-medium">{message}</p>}
         <button disabled={loading} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin w-4 h-4"/> : <Save className="w-4 h-4"/>}
            Enregistrer
         </button>
      </div>
    </form>
  );
}