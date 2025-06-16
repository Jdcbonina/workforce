import { NextResponse, type NextRequest } from "next/server";
// import { ConfirmResetPasswordMail, ResetPasswordMail } from "@/mails";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
// import { sendMail } from "@/lib/mail";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      return NextResponse.json(
        { error: "A session is already active." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { data, form, code } = body;

    const user = await prisma.employee.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Acount does not exist." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
};
