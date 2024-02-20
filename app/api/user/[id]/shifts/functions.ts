import { ShiftType } from "@/models/shift";

export const calculateTotalHours = (startTime: number, endTime: number): number => {
  if (endTime < startTime) {
    endTime += 24;
  }

  return endTime - startTime;
};


export interface WageBreakdownType {
  normalRateHrs: number;
  overtime125Hrs: number;
  overtime150Hrs: number;
  totalNormalRatePay: number;
  totalOvertime125Pay: number;
  totalOvertime150Pay: number;
  totalPay: number;
}

export const calcTotalWage = (totalHrs: number, hourlyRate: number, shiftDate: Date): WageBreakdownType => {
  const standardHours = 8;
  const overtimeRate125 = 1.25; // 125% for 9th and 10th hour
  const overtimeRate150 = 1.5;  // 150% for 11th hour and beyond

  let normalRateHrs = Math.min(totalHrs, standardHours);
  let overtime125Hrs = Math.max(0, Math.min(totalHrs - standardHours, 2)); // Overtime for 9th and 10th hour
  let overtime150Hrs = Math.max(0, totalHrs - (standardHours + 2)); // Overtime beyond 10th hour

  const totalNormalRatePay = normalRateHrs * hourlyRate;
  const totalOvertime125Pay = overtime125Hrs * overtimeRate125 * hourlyRate;
  const totalOvertime150Pay = overtime150Hrs * overtimeRate150 * hourlyRate;

  // Check if the entire shift or only one hour falls between Friday 18:00 and Saturday 18:00
  const isEntireShiftInSpecialRate =
    shiftDate.getDay() === 5 && shiftDate.getHours() >= 18 && shiftDate.getHours() + totalHrs <= 42; // 42 represents Saturday 18:00
  const isOneHourInSpecialRate =
    shiftDate.getDay() === 5 && shiftDate.getHours() >= 18 && shiftDate.getHours() + 1 <= 42; // Check for one hour

  let specialRateHrs = 0;
  if (isEntireShiftInSpecialRate) {
    specialRateHrs = totalHrs;
  } else if (isOneHourInSpecialRate) {
    specialRateHrs = 1;
  }

  const specialRatePay = specialRateHrs * overtimeRate150 * hourlyRate;

  const totalPay = totalNormalRatePay + totalOvertime125Pay + totalOvertime150Pay + specialRatePay;

  return {
    normalRateHrs,
    overtime125Hrs,
    overtime150Hrs,
    totalNormalRatePay,
    totalOvertime125Pay,
    totalOvertime150Pay,
    totalPay,
  };
};

