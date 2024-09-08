import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});
export const SigninSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
  });
export const CreatZapSchema=z.object({
  name:z.string(),
  AvailableTriggerId:z.string(),
  AvailableActionId:z.string()
  })