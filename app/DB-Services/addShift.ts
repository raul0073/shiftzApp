import { ShiftType } from "@/models/shift";
import { addShiftZod } from "@/schema/shift";
import { z } from "zod";
const { API_URL } = process.env

export const addShiftToUser = async (id: string, shift: z.infer<typeof addShiftZod>, profileId: string) => {
 
  try {
    const shiftWithDetails = shift
    shiftWithDetails.userId = id
    shiftWithDetails.userProfileId = profileId

    const res = await fetch(`api/user/${id}/shifts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shiftWithDetails),
    });

    if (!res.ok) {
      throw new Error("failed to add shift, service");
    }

    return res.json()
  } catch (err) {
    console.log("cant add shift", err);
  }
}