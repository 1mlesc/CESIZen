"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, LayoutDashboard, Wind, FileText } from "lucide-react";

const links = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/exercices", label: "Exercices", icon: Wind },
  { href: "/admin/content", label: "Contenus", icon: FileText },
];

export default function AdminSidebarLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:text-blue-400"}`} />
            <span className="font-medium">{link.label}</span>
          </Link>
        );
      })}
    </>
  );
}