import { prisma } from "@/lib/db";

export const UserModel = {
  /**
   * Chercher un utilisateur par son email
   * @param email 
   * @returns user ou null si non trouvé
   */
  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  },

  /**
   * Créer un nouvel utilisateur avec le rôle USER par défaut
   * @param data 
   * @returns nouvel utilisateur créé
   */
  create: async (data: any) => {
    // On cherche d'abord le rôle USER par défaut
    let userRole = await prisma.role.findFirst({
      where: { role: "USER" },
    });

    // Si le rôle n'existe pas, on le crée (utile pour le premier démarrage)
    if (!userRole) {
      userRole = await prisma.role.create({
        data: { role: "USER" },
      });
    }

    return await prisma.user.create({
      data: {
        email: data.email,
        family_name: data.family_name,
        first_name: data.first_name,
        birthdate: new Date(data.birthdate),
        password: data.password,
        roleId: userRole.id,
      },
    });
  },


  /**
   * Modifier les informations d'un utilisateur
   * @param email adresse mail de l'utilisateur
   * @param data données à mettre à jour
   * @returns l'utilisateur mis à jour
   */
  update: async (email: string, data: any) => {
    return await prisma.user.update({
      where: { email },
      data: data,
    });
  },
  
  /**
   * Trouver un utilisateur par son email en incluant le mot de passe
   * @param email adresse mail de l'utilisateur
   * @returns l'utilisateur trouvé ou null si non trouvé
   */
  findByEmailWithPassword: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  
};
