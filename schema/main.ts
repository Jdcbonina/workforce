import { z } from "zod";

export const userSchema = z.object({
  username: z.string().toLowerCase().min(1, {
    message: "Please enter your username.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
});
