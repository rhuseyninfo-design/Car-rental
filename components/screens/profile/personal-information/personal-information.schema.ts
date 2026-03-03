import { z } from "zod";

export const personalInformationSchema = z.object({
    avatar: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
});

export type PersonalInformationSchemaType = z.infer<typeof personalInformationSchema>;