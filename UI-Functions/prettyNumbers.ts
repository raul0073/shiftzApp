import { ShiftType } from "@/models/shift";

export const calculateWages = (shifts: ShiftType[]) => {
    // Total wage
    const totalWage = shifts.reduce((total, shift) => total + (shift.wage || 0), 0);
    const niceWage = Math.round(totalWage).toLocaleString();

    // Expected wage
    const transport = shifts.length * 10;
    let eWage = totalWage + transport;
    const expectedWage = Math.round(eWage).toLocaleString();

    // Average wage
    const av = totalWage / shifts.length;
    const averageWage = Math.floor(av * 100) / 100;

    return { niceWage, expectedWage, averageWage };
};