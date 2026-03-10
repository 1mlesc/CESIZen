# Image de base avec Node.js 22 (LTS)
FROM node:22-alpine AS base

# Installation des dépendances
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copie des fichiers de package et lock
COPY package.json package-lock.json ./
# Copie du dossier prisma pour la génération du client
COPY prisma ./prisma/

# Installation des dépendances incluant Prisma
RUN npm ci

# Génération du client Prisma (basé sur schema.prisma)
RUN npx prisma generate

# Construction de l'application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Désactivation de la télémétrie Next.js pour le build
ENV NEXT_TELEMETRY_DISABLED 1

# Construction du projet
RUN npm run build

# Image de production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Création d'un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copie des fichiers nécessaires au runtime
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Lancement de l'application
CMD ["npm", "start"]
