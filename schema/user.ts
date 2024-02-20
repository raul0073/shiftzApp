// zod schema

import { z } from "zod";

// update user
export const updateUser = z.object({
    fullName: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(4, { message: "Full Name must be at least 4 letters" }),
    push: z.boolean(),
    imageUrl: z.string().refine((x)=> x.startsWith('https://'), {message: `Url must start with 'https://'`})
})

export type updateUserSchema = z.infer<typeof updateUser>;
