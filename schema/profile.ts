import { z } from "zod";

const min2Error = 'Name must be 2 letters min.'

// Zod Schema
export const addProfile = z.object({
    name: z.string()
        .min(2, { message: 'Name must be 2 letters min.' })
        .refine((item) => /^[a-zA-Z]+$/.test(item), { message: 'Name must contain only letters.' }),
    // Add required validation
    type: z.boolean().default(true),
    workPlace: z.string()
        .min(2, { message: 'Work place must be 2 letters min.' })
        .refine((item) => /^[a-zA-Z]+$/.test(item), { message: 'Workplace must contain only letters.' }),
    hrWage: z.coerce.number().min(2, {message: "Wage must be at least 2 numbers"}),
    totalHrs: z.number().optional()
});

export type addProfileSchema = z.infer<typeof addProfile>;