import LoginForm from "@/app/components/auth/login/LoginForm";
import AuthImagePanel from "@/app/components/auth/signup/AuthImagePanel";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white pt-20">
      
      {/* GAUCHE : FORMULAIRE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
        <LoginForm />
      </div>

      {/* DROITE : IMAGE (Réutilisation du composant) */}
      <AuthImagePanel 
        title="La sérénité à portée de main"
        quote="Le calme est la plus grande des puissances."
      />
      
    </div>
  );
}