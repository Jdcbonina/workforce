"use client";

import React from "react";
import { Session } from "next-auth";

import { Card, CardContent } from "@/components/ui/card";
import ClockTime from "./clock-time";
import { useFindMany, useFindOne } from "@/lib/query";
import PreviousShift from "./previous-shift";
import Calendar from "./calendar";
import Schedule from "./schedule";

type ContentProps = {
  session: Session;
  clockIn: any;
};

const Content = ({ session, clockIn }: ContentProps) => {
  const { data: clockInHistory, refetch } = useFindMany({
    api: "/api/clock-time",
    key: "clock-in-history",
  });

  const history = clockInHistory || [];

  const handleUpdate = async () => {
    try {
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const { data: schedules } = useFindMany({
    api: "/api/schedule",
    key: "employee-schedule",
  });

  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      <ClockTime
        session={session}
        clockIn={clockIn}
        handleUpdate={handleUpdate}
        refetch={refetch}
      />

      <Schedule schedules={schedules} />

      <PreviousShift history={history} />

      <Card className="rounded-lg border-none col-span-3">
        <CardContent className="p-6">
          <Calendar />
        </CardContent>
      </Card>
    </div>
  );
};

export default Content;
