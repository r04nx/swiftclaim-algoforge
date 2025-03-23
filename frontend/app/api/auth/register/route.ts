import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Prepare contact person data if it exists
    const contactPerson = data.userType === "company" ? {
      name: data.contactPerson.name,
      designation: data.contactPerson.designation,
      email: data.contactPerson.email,
      phone: data.contactPerson.phone,
    } : null

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        userType: data.userType,
        accountType: data.accountType,
        insuranceTypes: JSON.stringify(data.insuranceType),
        existingPolicy: data.existingPolicy,
        policyNumber: data.policyNumber,
        companyName: data.companyName,
        registrationNumber: data.registrationNumber,
        companyType: data.companyType,
        contactPerson: contactPerson ? JSON.stringify(contactPerson) : null,
      },
    })

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(
      { 
        message: "User registered successfully",
        user: userWithoutPassword
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 