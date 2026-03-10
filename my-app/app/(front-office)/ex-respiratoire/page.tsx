import { auth } from "@/auth";
import { fetchAllExercices } from "@/controllers/exerciceController";
import ExerciceCard from "@/app/components/exercices/ExercicesCard";
import ExerciceStats from "@/app/components/exercices/ExerciceStats";
import CustomExerciceForm from "@/app/components/exercices/CustomExerciceForm";

export default async function ExercicesRespiratoiresPage() {
  // 1. Protection de la route
  const session = await auth();

  // 2. Récupération des données côté serveur (Zéro attente côté client)
  const result = await fetchAllExercices();
  const exercices = (result.success && "data" in result && result.data) ? result.data : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Exercices Respiratoires
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Prenez quelques minutes pour vous recentrer. Ces exercices sont conçus pour abaisser votre rythme cardiaque et réduire le stress instantanément.
          </p>
        </div>

        {/* Statistiques si connecté */}
        {session && <ExerciceStats />}

        {/* Formulaire personnalisé si connecté */}
        {session && <CustomExerciceForm />}

        {/* Grille d'exercices */}
        {exercices.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500">Aucun exercice configuré dans la base de données.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {exercices.map((exo) => (
              <ExerciceCard key={exo.id} exercice={exo} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}