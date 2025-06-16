"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Event = {
  date: Date;
  title: string;
  type: string;
};

const philippineHolidays: { [key: string]: string } = {
  "2024-01-01": "New Year's Day",
  "2024-04-09": "Araw ng Kagitingan",
  "2024-04-18": "Maundy Thursday",
  "2024-04-19": "Good Friday",
  "2024-05-01": "Labor Day",
  "2024-06-12": "Independence Day",
  "2024-08-26": "National Heroes Day",
  "2024-11-30": "Bonifacio Day",
  "2024-12-25": "Christmas Day",
  "2024-12-30": "Rizal Day",
};

const getPhilippineHoliday = (date: Date): string | null => {
  const dateString = date.toISOString().split("T")[0];
  return philippineHolidays[dateString] || null;
};

const generateEvents = (year: number, month: number): Event[] => {
  const events: Event[] = [];
  const types = ["meeting", "birthday", "deadline", "social"];

  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day);
    // Skip invalid dates (e.g., February 30)
    if (date.getMonth() !== month) continue;

    const holiday = getPhilippineHoliday(date);
    if (holiday) {
      events.push({
        date,
        title: holiday,
        type: "holiday",
      });
    }
  }

  // for (let i = 1; i <= 10; i++) {
  //   const day = Math.floor(Math.random() * 28) + 1;
  //   events.push({
  //     date: new Date(year, month, day),
  //     title: `Event on ${day}`,
  //     type: types[Math.floor(Math.random() * types.length)],
  //   });
  // }

  return events;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(
      generateEvents(currentDate.getFullYear(), currentDate.getMonth())
    );
  }, [currentDate]);

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCell = (day: number | null) => {
    if (day === null) {
      return <div className="border p-2 h-32" />;
    }

    const cellDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const cellEvents = events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === cellDate.getMonth() &&
        event.date.getFullYear() === cellDate.getFullYear()
    );
    const isToday = cellDate.toDateString() === new Date().toDateString();
    const holiday = getPhilippineHoliday(cellDate);

    return (
      <div
        className={`border p-2 h-32 overflow-hidden ${
          isToday ? "bg-blue-100" : ""
        } ${holiday ? "bg-red-100" : ""}`}
      >
        <div
          className={`font-semibold ${isToday ? "text-blue-600" : ""} ${
            holiday ? "text-red-600" : ""
          }`}
        >
          {day}
        </div>
        {cellEvents.map((event, index) => (
          <div
            key={index}
            className={`text-xs mt-1 p-1 rounded ${getEventColor(event.type)}`}
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "holiday":
        return "bg-red-600 text-white";
      case "meeting":
        return "bg-blue-400 text-black";
      case "birthday":
        return "bg-green-400 text-black";
      case "deadline":
        return "bg-yellow-400 text-black";
      case "social":
        return "bg-purple-400 text-black";
      default:
        return "bg-gray-200 text-black";
    }
  };

  // Generate calendar grid data
  const generateCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    // Create array for the days of the month
    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Add empty cells to complete the grid (if needed)
    const totalCells = Math.ceil(days.length / 7) * 7;
    while (days.length < totalCells) {
      days.push(null);
    }

    return days;
  };

  const calendarDays = generateCalendarGrid();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Philippine Calendar
      </h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day, index) => (
          <div
            key={`header-${index}`}
            className="font-semibold text-center p-2"
          >
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <React.Fragment key={`day-${index}`}>
            {renderCell(day)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
