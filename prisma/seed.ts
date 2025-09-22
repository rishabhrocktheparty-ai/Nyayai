import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create users for each role
  const passwordHash = await bcrypt.hash('password123', 10)

  const citizenUser = await prisma.user.upsert({
    where: { email: 'citizen@example.com' },
    update: {},
    create: {
      email: 'citizen@example.com',
      phone: '9990000001',
      password: passwordHash,
      role: Role.CITIZEN,
      citizenProfile: { create: { name: 'Demo Citizen' } },
    },
  })

  const employeeUser = await prisma.user.upsert({
    where: { email: 'employee@example.com' },
    update: {},
    create: {
      email: 'employee@example.com',
      phone: '9990000002',
      password: passwordHash,
      role: Role.COURT_EMPLOYEE,
      courtProfile: { create: { courtId: 'COURT-001' } },
    },
  })

  const lawyerUser = await prisma.user.upsert({
    where: { email: 'lawyer@example.com' },
    update: {},
    create: {
      email: 'lawyer@example.com',
      phone: '9990000003',
      password: passwordHash,
      role: Role.LAWYER,
      lawyerProfile: { create: { barId: 'BAR-12345' } },
    },
  })

  const judgeUser = await prisma.user.upsert({
    where: { email: 'judge@example.com' },
    update: {},
    create: {
      email: 'judge@example.com',
      phone: '9990000004',
      password: passwordHash,
      role: Role.JUDGE,
      judgeProfile: { create: {} },
    },
  })

  // Create a demo case for the citizen
  const citizen = await prisma.citizenProfile.findUniqueOrThrow({ where: { userId: citizenUser.id } })
  const caseRec = await prisma.case.create({
    data: {
      title: 'Demo Case: Lost ID',
      description: 'A sample case to demonstrate flows.',
      citizenId: citizen.id,
      parties: {
        create: [
          { name: 'Demo Citizen', role: 'Plaintiff' },
          { name: 'Unknown', role: 'Defendant' },
        ],
      },
    },
  })

  // Assign a lawyer to the case
  const lawyer = await prisma.lawyerProfile.findUniqueOrThrow({ where: { userId: lawyerUser.id } })
  await prisma.lawyerAssignment.create({
    data: {
      caseId: caseRec.id,
      lawyerId: lawyer.id,
      role: 'Lead Counsel',
      drafts: { create: [{ content: 'Initial draft content' }] },
    },
  })

  // Add a hearing with the judge
  const judge = await prisma.judgeProfile.findUniqueOrThrow({ where: { userId: judgeUser.id } })
  await prisma.hearing.create({
    data: {
      caseId: caseRec.id,
      judgeId: judge.id,
      date: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      minutes: 'Scheduling order for preliminary hearing.',
    },
  })

  console.log('Seed complete: users and demo case created.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
