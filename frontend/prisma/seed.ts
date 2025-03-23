import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create a demo user
  const hashedPassword = await bcrypt.hash('demo123', 10)
  
  await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
      phone: '1234567890',
      userType: 'individual',
      insuranceTypes: JSON.stringify(['Health Insurance', 'Motor Insurance']),
      claims: {
        create: [
          {
            type: 'Health',
            amount: 25000,
            status: 'pending',
            description: 'Hospital admission for surgery',
            documents: JSON.stringify(['medical_report.pdf', 'bills.pdf']),
          }
        ]
      },
      policies: {
        create: [
          {
            type: 'Health Insurance',
            coverage: 500000,
            expiry: new Date('2025-03-15'),
            provider: 'Max Life Insurance',
            premium: 12000,
            benefits: JSON.stringify(['Cashless Treatment', 'No Claim Bonus']),
          }
        ]
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 