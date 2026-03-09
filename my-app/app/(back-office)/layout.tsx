import '../globals.css';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { SignOutButton } from "@/app/components/auth/signout/SignOutButton";
import AdminSidebarLinks from "@/app/components/dashboard/back-office/AdminSidebarLinks";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Protection stricte au niveau du Layout
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/"); 
  }

  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-20">
            <div className="p-6 flex items-center gap-3 border-b border-gray-800">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
              <span className="font-bold text-xl tracking-tight">CESIZen Admin</span>
            </div>
            
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <AdminSidebarLinks />
            </nav>

            <div className="p-4 border-t border-gray-800 bg-gray-900">
              <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-blue-400 shrink-0">
                  {session.user?.name?.charAt(0) || "A"}
                </div>
                <div className="truncate">
                  <p className="font-medium text-white truncate">{session.user?.name || "Admin"}</p>
                  <p className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">Administrateur</p>
                </div>
              </div>
              <div className="mt-2">
                <SignOutButton />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-64 overflow-y-auto">
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
              <h2 className="font-semibold text-gray-800">Back-Office CESIZen</h2>
              <div className="text-sm text-gray-500 italic">Version 1.0.0</div>
            </header>
            <div className="p-8 max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}