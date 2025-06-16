import { z } from "zod";
// Creating schedule
const dayData = z.object({
  // id: z.string(),
  day: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  employee_id: z.string(),
});

export const employeeSchedule = z.object({
  monday: dayData.optional(),
  tuesday: dayData.optional(),
  wednesday: dayData.optional(),
  thursday: dayData.optional(),
  friday: dayData.optional(),
  saturday: dayData.optional(),
  sunday: dayData.optional(),
});


// Update schedule
const scheduleUpdate = z.object({
  id: z.string(),
  day: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  employee_id: z.string(),
});

export const employeeScheduleUpdate = z.object({
  monday: scheduleUpdate.optional(),
  tuesday: scheduleUpdate.optional(),
  wednesday: scheduleUpdate.optional(),
  thursday: scheduleUpdate.optional(),
  friday: scheduleUpdate.optional(),
  saturday: scheduleUpdate.optional(),
  sunday: scheduleUpdate.optional(),
});