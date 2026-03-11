"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Timer, LogOut, User } from "lucide-react";
import { SignOutButton } from "./auth/signout/SignOutButton";

interface NavBarProps {
  session: any;
}

const NavBar = ({ session }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Contact", href: "/contact" },
  ];

  const exerciceLinks = [
    { name: "Exercice Respiratoire", href: "/ex-respiratoire", icon: <Timer /> }
  ];

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200/50 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">

          {/* --- 1. LOGO & TEXTE --- */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center w-full md:w-auto">
              
              {/* IMAGE DU LOGO : Reste naturellement à gauche */}
              <div className="relative z-10">
                <Image src="/logo_cesizen_alone.svg" alt="Logo CESIZen" width={60} height={60} />
              </div>

              {/* TEXTE : Absolu au centre sur mobile, Statique à droite du logo sur Desktop */}
              <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:ml-2">
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-green-700">
                  CESI
                </span>
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-400">
                  Zen
                </span>
              </div>

            </Link>
          </div>

          {/* --- 2. BOUTON MOBILE (Remis à Droite) --- */}
          <div className="flex md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 focus:outline-none transition-colors"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {!isOpen ? (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* --- 3. MENU DESKTOP --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ))}

              {/* ACTION DROPDOWN EXERCICES */}
              <div 
                className="relative group"
                ref={dropdownRef}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 relative text-gray-600 hover:text-green-600 font-medium transition-colors duration-300"
                >
                  Exercices
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-green-600 transform transition-transform duration-300 origin-left ${isDropdownOpen ? 'scale-x-100' : 'scale-x-0'}`}></span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="rounded-xl bg-white border border-gray-100 shadow-xl py-2">
                      {exerciceLinks.map((ex) => (
                        <Link
                          key={ex.name}
                          href={ex.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            {ex.icon}
                            {ex.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {session ? (
                <div className="flex gap-1.5">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-full text-green-500 font-semibold text-sm shadow-md hover:border-2 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                 <User className="w-4 h-4 hover" />
                </Link>

                <SignOutButton />
              </div>
              ) : (
              <div className="flex gap-1.5">
                <Link
                  href="/auth/signup"
                  className="px-5 py-2.5 rounded-full text-green-500 font-semibold text-sm shadow-md hover:border-2 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  S&apos;inscrire
                </Link>

                <Link
                  href="/auth/login"
                  className="px-5 py-2.5 rounded-full bg-green-600 text-white font-semibold text-sm shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Connexion
                </Link>
              </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* --- MENU MOBILE (Drawer) --- */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {exerciceLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {session ? (
            <div className="flex gap-1.5 justify-center">
              <Link
                href="/dashboard"
                className="px-5 py-2.5 rounded-full text-green-500 font-semibold text-sm shadow-md hover:border-2 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <User className="w-4 h-4 hover" />
              </Link>

              <SignOutButton />
            </div>
          ) : (
          <div className="pt-4 pb-2 flex gap-1.5 justify-center">
            <Link
              href="/auth/signup"
              className="px-5 py-2.5 rounded-full text-green-500 font-semibold text-sm shadow-md hover:border-2 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              S&apos;inscrire
            </Link>

            <Link
              href="/auth/login"
              className="px-5 py-2.5 rounded-full bg-green-600 text-white font-semibold text-sm shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Connexion
            </Link>
          </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;