import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Données pour les liens
  const footerLinks = {
    navigation: [
      { name: "Accueil", href: "/" },
      { name: "Exercice Respiratoire", href: "/ex-respiratoire" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [],
    social: [
      { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "#" },
      { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "#" },
      { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "#" },
      { name: "Linkedin", icon: <Linkedin className="w-5 h-5" />, href: "#" },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GRILLE PRINCIPALE */}
        {/* Ajout de 'text-center md:text-left' pour gérer l'alignement global du texte */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          
          {/* COLONNE 1 : MARQUE & DESCRIPTION */}
          <div className="space-y-4">
            {/* Ajout de 'justify-center md:justify-start' pour centrer le logo flex sur mobile */}
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2">
              <Image src="/logo_cesizen_alone.svg" alt="Logo CESIZen" width={40} height={40} />
              <div>
                <span className="text-xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-green-700">
                  CESI
                </span>
                <span className="text-xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-400">
                  Zen
                </span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Votre partenaire bien-être au quotidien. Retrouvez le calme et la sérénité grâce à nos exercices de respiration et nos conseils santé.
            </p>
            {/* Icônes Réseaux Sociaux : Centrage flex */}
            <div className="flex justify-center md:justify-start space-x-4 pt-2">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-green-600 transition-colors duration-200 transform hover:-translate-y-1"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLONNE 2 : NAVIGATION */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  {/* Ajout de 'justify-center md:justify-start' pour les liens */}
                  <Link 
                    href={link.href} 
                    className="text-gray-500 hover:text-green-600 text-sm transition-colors duration-200 flex items-center justify-center md:justify-start gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-600 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 3 : CONTACT RAPIDE */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4">Nous contacter</h3>
            <p className="text-gray-500 text-sm mb-4">
              Une question ? Notre équipe est là pour vous aider.
            </p>
            {/* Centrage du lien mail qui est en flex */}
            <a 
              href="mailto:contact@cesizen.fr" 
              className="inline-flex items-center justify-center md:justify-start gap-2 text-green-600 font-medium hover:text-green-700 transition-colors w-full md:w-auto"
            >
              <Mail className="w-5 h-5" />
              contact@cesizen.fr
            </a>
          </div>
        </div>

        {/* BARRE DE COPYRIGHT */}
        <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} CESI Zen. Tous droits réservés blablablablalb.
          </p>
          
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <span>Fait avec</span>
            <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
            <span>par l&apos;équipe CESI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;