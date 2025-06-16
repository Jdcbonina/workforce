import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  try {
    const department = await prisma.department.findMany();

    return NextResponse.json(department, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
};
