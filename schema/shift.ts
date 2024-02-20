import { z } from "zod";


const timeError = "Time must be 2 numbers"
// Zod Schema
export const addShiftZod = z.object({
    shiftDate: z.string({
      required_error: "Shift date is required",
      invalid_type_error: "Date must be a string",
    }),
    startTime: z.coerce.number({
      required_error: "Start time is required",
      invalid_type_error: "Time must be a number",
    }),
    endTime: z.coerce.number({
      required_error: "End time is required",
      invalid_type_error: "Time must be a number",
    }),
    totalHrs: z.number().optional(),
    userId: z.string().optional(),
    userProfileId: z.string().optional(),
    wage: z.number().optional()
});

export type addShiftSchema = z.infer<typeof addShiftZod>;
