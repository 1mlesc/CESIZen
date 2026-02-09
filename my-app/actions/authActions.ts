"use server"

import { registerUser, verifyUser } from "@/controllers/authController";
import { redirect } from "next/navigation";

export async function signupAction(formData: any) {
  const result = await registerUser(formData);

  if (result.success) {
    // Redirection vers la page de connexion après une inscription réussie
    redirect('/auth/login?registered=true');
  } else {
    return { error: result.message, statusCode: result.statusCode };
  }
}

export async function loginAction(formData) {
  const result = await verifyUser(formData);

  if (result.success) {
    // TODO: session utilisateur
    redirect("/"); // Redirection vers l'accueil ou le tableau de bord
  } else {
    return { error: result.error };
  }
}