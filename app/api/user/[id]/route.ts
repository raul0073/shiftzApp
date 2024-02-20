
import connectMongoDB from "@/lib/mongoDB";
import User, { UserType } from "@/models/user";

import { NextRequest, NextResponse } from "next/server";

// get all transactions
export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    const {id} = params
    try {
        await connectMongoDB();
        const data: UserType | null = await User.findById(id);
        return NextResponse.json({ data })
    } catch (err) {
        throw new Error('problem getting users' + err)
    } 
}

