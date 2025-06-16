import { z } from "zod";

export const ClockTimeSchema = z.object({
  employee_id: z.string(),
});
