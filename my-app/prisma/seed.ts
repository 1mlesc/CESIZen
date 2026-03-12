import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding roles and categories...')

  // Roles
  // Note: Current schema doesn't have @unique on Role.role, so we use IDs
  const adminRole = await prisma.role.upsert({
    where: { id: 1 },
    update: { role: 'ADMIN' },
    create: { id: 1, role: 'ADMIN' },
  })

  const userRole = await prisma.role.upsert({
    where: { id: 2 },
    update: { role: 'USER' },
    create: { id: 2, role: 'USER' },
  })

  // Categories
  const santeCategorie = await prisma.categorie.upsert({
    where: { name: 'SANTE' },
    update: { name: 'SANTE' },
    create: { name: 'SANTE' },
  })

  const aideCategorie = await prisma.categorie.upsert({
    where: { name: 'AIDE' },
    update: { name: 'AIDE' },
    create: { name: 'AIDE' },
  })

  console.log('Seed completed successfully:')
  console.log({ adminRole, userRole, santeCategorie, aideCategorie })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
