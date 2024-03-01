import connectMongoDB from "@/lib/mongoDB"
import Shift from "@/models/shift"
import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from 'mongodb';

// post new shift
export async function DELETE(req: NextRequest, { params }: { params: { shiftId: string } }) {
    const {shiftId} = params
    try {
        await connectMongoDB()
        const res = await Shift.findByIdAndDelete({ _id: new ObjectId(shiftId) })
        return NextResponse.json("Shift deleted")

    } catch (err) {
        throw new Error('Could not delete shift' + err)
    }
}

