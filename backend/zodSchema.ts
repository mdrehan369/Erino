import { z } from "zod";

export const contactZodSchema = z.object({
    firstName: z.string({ required_error: "First name is required!" }),
    lastName: z.string({ required_error: "Last name is required!" }),
    email: z.string({ required_error: "Email is required!" }).email({ message: "Invalid email address" }),
    phoneNumber: z.string({ required_error: "Phone number is required!" }).regex(new RegExp(/^\d{10}$/), { message: "Invalid phone number" }),
    company: z.string({ required_error: "Company is required!" }),
    job_title: z.string({ required_error: "Job title is required!" }),
})