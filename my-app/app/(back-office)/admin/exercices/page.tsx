import { getAllExercicesAction } from "@/actions/exerciceActions";
import ExerciceTable from "@/app/components/dashboard/back-office/ExerciceTable";

export default async function AdminExercicesPage() {
  const result = (await getAllExercicesAction()) as any;
  const exercices = result.success ? result.data : [];

  return (
    <ExerciceTable initialExercices={exercices} />
  );
}
