import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EditProfileForm from "@/app/components/dashboard/EditProfileForm";
import ChangePasswordForm from "@/app/components/dashboard/ChangePasswordForm";
import { getUserProfileAction } from "@/actions/userAction";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) redirect("/auth/login");

  // Récupération des données utilisateur complètes via le controller (via l'action server)
  const profileRes = await getUserProfileAction();
  
  // Si on n'arrive pas à récup l'user, on peut fallback sur la session ou afficher une erreur
  const user = profileRes.success ? profileRes.user : session.user;
  const isAdmin = (session.user as any)?.role === "ADMIN";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 pt-30 pb-60">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-500">Gérez vos informations personnelles et votre sécurité.</p>
        </div>
        {isAdmin && (
          <Link 
            href="/admin"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <ShieldCheck className="w-5 h-5" />
            Accéder au Back-Office
          </Link>
        )}
      </div>

      {/* Grille de formulaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* On passe les infos utilisateur au formulaire pour les afficher par défaut */}
        <EditProfileForm user={user} />
        
        <ChangePasswordForm />
      </div>
    </div>
  );
}