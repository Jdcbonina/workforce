import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { employeeSchedule, employeeScheduleUpdate } from "@/schema/schedule";
import { z } from "zod";

export const dynamic = "force-dynamic";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "A session is required." },
        { status: 401 }
      );
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id_number: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        suffix: true,
        email: true,
        department: {
          select: {
            name: true,
          },
        },
        employment_status: true,
        date_employed: true,
        username: true,
        password: true,
        schedule: true,
      },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee doesn't or no longer exist." },
        { status: 401 }
      );
    }

    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const data = body;

    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ].map(async (schedule) => {
      if (data[schedule].day) {
        await prisma.schedule.create({
          data: {
            start_time: data[schedule].start_time,
            end_time: data[schedule].end_time,
            day: data[schedule].day,
            employee: {
              connect: {
                id: data[schedule].employee_id,
              },
            },
          },
        });
      }
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong to the server" },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "A session is required!" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const data = body;
  const scheduleId = data.id

  console.log(data.type)

  try {
    switch (data.type) {
      case 'edit':
        const days = [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ];
    
        const seenDays = new Set();
        let hasDuplicate = false;
    
        for (const schedule of days) {
          if (data[schedule]?.day) {
            if (seenDays.has(data[schedule].day)) {
              return NextResponse.json(
                { error: "Duplicate schedule found!" },
                { status: 400 })
            }
            seenDays.add(data[schedule].day);
          }
        }
    
        for (const schedule of days) {
          if (data[schedule]?.day) {
            await prisma.schedule.update({
              where: { id: data[schedule].id },
              data: {
                start_time: data[schedule].start_time,
                end_time: data[schedule].end_time,
                day: data[schedule].day,
                employee: {
                  connect: { id: data[schedule].employee_id },
                },
              },
            });
          }
        }
    
        console.log("Has Duplicate", hasDuplicate)
    
        if (hasDuplicate) {
          console.log(hasDuplicate)
          return NextResponse.json({error: "Duplicate day found in schedule"}, {status: 400});
        }
    
        return NextResponse.json({ status: 200 });
      case 'delete':
        for (const schedule of scheduleId) {
          await prisma.schedule.delete({
            where: { id: schedule },
          })
        }

        return NextResponse.json({ status: 200 });
      default:
        return NextResponse.json({ status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong on the server" },
      { status: 500 }
    );
  }
};
