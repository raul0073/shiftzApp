import connectMongoDB from "@/lib/mongoDB";
import { ProfileType } from "@/models/profile";
import Shift, { ShiftType } from "@/models/shift";
import User, { UserType } from "@/models/user";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { calcTotalWage, calculateTotalHours } from "./functions";



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await connectMongoDB();
        const shifts: ShiftType[] | null = await Shift.find({ userId: id }).sort({ shiftDate: -1 });
         // Group shifts by month
        const shiftsByMonth: { [month: number]: ShiftType[] } = {};
  

        // Now shiftsByMonth contains the shifts grouped by month
        return NextResponse.json(shifts); // Return shiftsByMonth instead of shifts
    } catch (err) {
        throw new Error('problem getting users' + err);
    }
}


// post new shift
export async function POST(req: NextRequest) {
    const shift = await req.json()
    try {
        await connectMongoDB();
        // get date obj
        const date = new Date(shift.shiftDate)
        // new shift obj
        const newShift: ShiftType | any = new Shift(shift)
        // calc shift hrs
        newShift.totalHrs = calculateTotalHours(newShift.startTime, newShift.endTime)
        // calc shift wage

        // get this user's active profile's hourlyRate
        const user: UserType | null = await User.findById(newShift.userId)
        if (!user) {
            throw new Error('No user found')
        }
        newShift._id = new ObjectId().toString()
        const profileHrlyRate = user.profiles.find((profile: ProfileType) => new ObjectId(profile._id).toString() === newShift.userProfileId.toString())
        if (profileHrlyRate) {
            let wageRes = calcTotalWage(newShift.totalHrs, Number(profileHrlyRate?.hrWage), date)
            newShift.wage = wageRes.totalPay
            newShift.wageBreakdown = wageRes
        }

        await newShift.save()
        return NextResponse.json({ newShift })
    } catch (err) {
        throw new Error('problem getting users' + err)
    }
}

