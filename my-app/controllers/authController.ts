import { UserModel } from "@/models/User";
import bcrypt from "bcryptjs";
import { signupSchema, loginSchema } from "@/schemas/auth/signupSchema";

/**
 * 
 * @param data Données d'inscription qui sera vérifier par le schéma
 * @returns true si la création a réussi
 */
export const registerUser = async (data: any) => {
  // Validation des données avec le schéma Zod
  const parsedData = signupSchema.parse(data);

  // Vérification si l'utilisateur existe déjà
  const existingUser = await UserModel.findByEmail(parsedData.email);
  if (existingUser) {
    return { success: false, message: "Un compte avec cet email existe déjà.", statusCode: 409 };
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(parsedData.password, 10);

  // Création de l'utilisateur
  const newUser = await UserModel.create({
    first_name: parsedData.first_name,
    family_name: parsedData.last_name,
    birthdate: parsedData.birth_date,
    email: parsedData.email,
    password: hashedPassword,
  });
  if (!newUser) {
    return { success: false, message: "Erreur lors de la création de l'utilisateur.", statusCode: 500 };
  }
  return { success: true, message: "Utilisateur créé avec succès.", statusCode: 201, };
}

/**
 * 
 * @param data Données de connexion qui sera vérifiée par le schéma
 * @returns 
 */
export const verifyUser = async (data: any) => {
  try {
    // 1. Validation des données d'entrée via Zod
    const validation = loginSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: validation.error.message };
    }

    const { email, password } = validation.data;

    // 2. Récupérer l'utilisateur via le Model
    const user = await UserModel.findByEmail(email);

    if (!user) {
      return { success: false, error: "Email ou mot de passe incorrect." };
    }

    // 3. Vérifier le mot de passe (Hash vs Clair)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "Email ou mot de passe incorrect." };
    }

    // 4. Succès (On renvoie l'utilisateur sans le mot de passe)
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };

  } catch (error) {
    console.error("Erreur login controller:", error);
    return { success: false, error: "Erreur serveur." };
  }
};