import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "A session is required." },
      { status: 401 }
    );
  }

  try {
    const schedule = await prisma.schedule.findMany({
      where: {
        employee_id: session.user.id,
      },
    });

    if (!schedule) {
      return NextResponse.json(
        { error: "Employee schedule doesn't or no longer exist." },
        { status: 401 }
      );
    }

    return NextResponse.json(schedule, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json([], { status: 200 });
  }
};
