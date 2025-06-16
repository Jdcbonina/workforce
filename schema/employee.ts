import { z } from "zod";

export const employeeSchema = z.object({
  id_number: z.string().toUpperCase().min(3, {
    message: "Please enter the employees's ID Number",
  }),
  first_name: z.string().min(1, {
    message: "Please enter the employees's firstname",
  }),
  last_name: z.string().min(1, {
    message: "Please enter the employees's lastname",
  }),
  middle_name: z.string().min(1, {
    message: "Please enter the employees's middlename",
  }),
  suffix: z.string(),
  email: z.string().toLowerCase().min(1, {
    message: "Please enter the employees's email",
  }),
  contact_number: z.string().toLowerCase().min(1, {
    message: "Please enter the employee's contact number",
  }),
  department: z.object({
    id: z.string(),
    name: z.string({
      required_error: "Please select a department to display.",
    }),
  }),
  employment_status: z.string().min(1, {
    message: "Please enter the employment status",
  }),
  date_employed: z.date().nullable(),
  username: z.string().toLowerCase().min(1, {
    message: "Please enter a username",
  }),
  password: z.string().toLowerCase().min(1, {
    message: "Please enter a password",
  }),
});
