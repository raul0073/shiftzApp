import { ShiftType } from "@/models/shift";
export const filterShiftsByMonth = (month: number, shifts: ShiftType[]) => {
    // Ensure that month is a valid number between 1 (January) and 12 (December)
    if (isNaN(month) || month < 1 || month > 12) {
      throw new Error('Invalid month');
    }
  
    // Filter shifts based on the specified month
    return shifts.filter((shift) => {
      const shiftDate = new Date(shift.shiftDate);
      return shiftDate.getMonth() + 1 === month; // getMonth returns 0-based index
    });
  };