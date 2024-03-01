
import {  ShiftByMonthDTO, ShiftType } from '@/models/shift';
const {API_URL} = process.env

export const getAllShifts = async (id: string) => {
  try {

    const res = await fetch(`api/user/${id}/shifts`);

    if (!res.ok) {
      throw new Error("failed to fetch");
    }

    const shifts: ShiftType[] = await res.json()
    // return the user proflie
    return shifts;
  } catch (err) {
    console.log("cant get shifts", err);
  }
};

export function organizeShiftsByMonth(shifts: ShiftType[]): ShiftByMonthDTO {
  const organizedShifts: ShiftByMonthDTO = {};

  shifts.forEach((shift) => {
    const monthName = new Date(shift.shiftDate).toLocaleString('default', { month: 'long' });

    if (!organizedShifts[monthName]) {
      organizedShifts[monthName] = [shift];
    } else {
      organizedShifts[monthName].push(shift);
    }
  });

  return organizedShifts;
}