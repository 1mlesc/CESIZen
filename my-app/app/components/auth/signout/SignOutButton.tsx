import { LogOut } from "lucide-react";
import { logoutAction } from "@/actions/authActions"; // ✅ On importe l'action serveur, pas la librairie auth

export function SignOutButton() {
  return (
    <form action={logoutAction}>
      <button 
        type="submit" 
        className="px-5 py-2.5 rounded-full bg-green-600 text-white font-semibold text-sm shadow-md hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </form>
  );
}