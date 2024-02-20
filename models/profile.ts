
import { ObjectId } from 'mongodb'
import { Schema } from 'mongoose'

//\\//\\//\\//\\//\\//\\//\\//\\//\\     PROFILE     //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
export const profileSchema = new Schema({
    name: String,
    type: Boolean,
    workPlace: String,
    hrWage: Number,
    totalHrs: Number
})



export type ProfileType = {
    _id?: string,
    name: string,
    type: boolean,
    workPlace: string,
    hrWage: number,
    totalHrs: number
}
