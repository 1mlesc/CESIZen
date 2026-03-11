import { getAllExercicesAction } from "@/actions/exerciceActions";
import ExerciceTable from "@/app/components/dashboard/back-office/ExerciceTable";

export default async function AdminExercicesPage() {
  const result = await getAllExercicesAction();
  const exercices = (result.success && "data" in result && result.data) ? result.data : [];

  return (
    <ExerciceTable initialExercices={exercices} />
  );
}
