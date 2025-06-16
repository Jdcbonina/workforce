import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { employeeSchema } from "@/schema/employee";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
      },
    });

    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const data: z.infer<typeof employeeSchema> = body;

    const [existingUsername, existingID, existingEmail] =
      await prisma.$transaction([
        prisma.employee.findUnique({
          where: {
            username: data.username,
          },
        }),

        prisma.employee.findUnique({
          where: {
            id_number: data.id_number,
          },
          select: {
            id_number: true,
          },
        }),

        prisma.employee.findUnique({
          where: {
            email: data.email,
          },
        }),
      ]);

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username is already exists." },
        { status: 400 }
      );
    }

    if (existingID) {
      return NextResponse.json(
        { error: "ID Number is already exist." },
        { status: 400 }
      );
    }

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email is already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.employee.create({
      data: {
        id_number: "W-" + data.id_number,
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        suffix: data.suffix,
        email: data.email,
        contact_number: data.contact_number,
        department: {
          connect: {
            id: data.department.id,
          },
        },
        employment_status: data.employment_status,
        date_employed: data.date_employed,
        username: data.username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Employee created successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "A session is required!" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = body;

    await prisma.employee.delete({
      where: {
        id: data.id,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong on the server" },
      { status: 500 }
    );
  }
};
