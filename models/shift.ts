import mongoose, { Schema } from 'mongoose';
import { WageBreakdownType } from './../app/api/user/[id]/shifts/functions';



// mongoose schema
const shiftSchema = new Schema({
    userId: String,
    userProfileId: String,
    shiftDate: Date,
    endTime: Number,
    startTime: Number,
    totalHrs: Number,
    wage: Number,
    wageBreakdown: {} as WageBreakdownType
}, {
    timestamps: true
},
)




export type ShiftType = {
    _id?: string
    userId: string,
    userProfileId: String,
    shiftDate: Date,
    endTime: number ,
    startTime: number ,
    totalHrs: number,
    wage: number,
    wageBreakdown?: WageBreakdownType
}

const Shift = mongoose.models.shifts || mongoose.model("shifts", shiftSchema)
export default Shift





export type ShiftByMonthDTO = {
    [month: string]: ShiftType[];
};