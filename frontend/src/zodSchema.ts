import { z } from 'zod'

export const contactZodSchema = z.object({
    firstName: z.string().min(1, 'First name is required!'),
    lastName: z.string().min(1, 'Last name is required!'),
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, 'Email is required!'),
    phoneNumber: z
        .string()
        .regex(new RegExp(/^\d{10}$/), { message: 'Invalid phone number' }),
    company: z.string().min(1, 'Company is required!'),
    job_title: z.string().min(1, 'Job title is required!'),
})
