"use server"

import { registerUser } from "@/controllers/authController";
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