import { auth } from "@/auth";
import { LayoutDashboard, Users, Wind, FileText, Activity } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Bienvenue, {session?.user?.name}. Voici un aperçu de l'activité de CESIZen.</p>
      </div>

      {/* Cartes de statistiques rapides (Placeholders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Utilisateurs</p>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Exercices</p>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Contenus</p>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Sessions</p>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
        </div>
      </div>

      {/* Zone vide pour futur contenu */}
      <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
        <LayoutDashboard className="w-12 h-12 text-gray-200 mb-4" />
        <h3 className="text-lg font-bold text-gray-900">Statistiques détaillées à venir</h3>
        <p className="text-gray-500 max-w-sm mt-2">Le tableau de bord est en cours de configuration. Utilisez la barre latérale pour naviguer dans les différentes sections.</p>
      </div>
    </div>
  );
}