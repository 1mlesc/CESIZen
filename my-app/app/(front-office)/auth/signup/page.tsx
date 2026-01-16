import React from "react";
import SignupForm from "../../../components/auth/signup/SignupForm";
import AuthImagePanel from "../../../components/auth/signup/AuthImagePanel";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex bg-white pt-20">
 
      {/* CÔTÉ GAUCHE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
        <SignupForm />
      </div>

      {/* CÔTÉ DROIT */}
      <AuthImagePanel 
        title="Votre équilibre commence ici"
        quote="Prendre soin de soi, c'est donner le meilleur de soi-même aux autres."
      />
    </div>
  );
}