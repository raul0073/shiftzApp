import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'
import { ProfileType, profileSchema } from './profile'



const userSchema = new Schema({
    _id: ObjectId,
    activeProfile: ObjectId,
    fullName: String,
    imageUrl: String,
    push: Boolean,
    userId: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profiles: [profileSchema],
    
}, {
    timestamps: true
},
)

export type UserType = {
    _id: string ,
    activeProfile?: string | ObjectId,
    userId: string,
    email: string,
    fullName: string,
    imageUrl: string
    profiles: ProfileType[],
    push: boolean
    createdAt: Date,
    updatedAt: Date,
}   




const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User



