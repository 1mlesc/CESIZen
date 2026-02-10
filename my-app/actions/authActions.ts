"use server"

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
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

export async function loginAction(formData: any) {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: "/", // Redirection après connexion réussie
    });
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Identifiants incorrects." };
        default:
          return { error: "Une erreur est survenue." };
      }
    }

    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/auth/login" });
}