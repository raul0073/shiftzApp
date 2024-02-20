import connectMongoDB from '@/lib/mongoDB';
import User from '@/models/user';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { ObjectId } from 'mongodb';

export const initShifts = async () => {
    // get user details
    const user = await currentUser()
    // if null redirect to login
    if (!user) {
        return redirectToSignIn()
    }

    // connect mongo
    try {
        await connectMongoDB()
        // get user
        const existingUser = await User.findOne({ userId: user.id })
        // if null, initialize user
        if (!existingUser) {
            const newUser = new User({
                _id: new ObjectId(),
                userId: user.id,
                fullName: `${user.firstName} ${user.lastName}` || "Guest",
                email: user.emailAddresses[0].emailAddress,
                imageUrl: user.imageUrl || "",
            })
            // save user to db
            await newUser.save()
            console.log("created new");
            return newUser
        } else {
            // return the user
            return existingUser
        }
    } catch (error) {
        console.error(error);
    } 
}