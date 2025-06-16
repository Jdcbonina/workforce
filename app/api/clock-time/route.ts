import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 }
    );
  }

  try {
    const employeeId = session.user.id;

    const history = await prisma.clockTime.findMany({
      where: {
        employee_id: employeeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong to the server." },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
      0;
    }

    const body = await request.json();
    const data = body;

    const newClockTime = await prisma.clockTime.create({
      data: {
        employee: {
          connect: {
            id: data.employee.id,
          },
        },
        clockIn: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Clock-in successful", id: newClockTime?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing clock-in:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = body;

    const updatedClockTime = await prisma?.clockTime.update({
      where: {
        id: data.id,
      },
      data: {
        clockOut: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Clock-out successful", id: updatedClockTime?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing clock-out:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
};
