'use server'
import connectMongoDB from '@/lib/mongoDB';
import User, { UserType } from '@/models/user';
import { addProfile } from '@/schema/profile';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export const createProfile = async (id: string, profile: any) => {
  
  try {
    // Connect to MongoDB
    await connectMongoDB();

    const user: UserType | any = await User.findById(id)
    if (!user) {
      throw new Error("Can't find user")
    }
    const validateUser = addProfile.safeParse(profile)
    if (validateUser.success) {
      profile._id = new ObjectId()
      user.activeProfile = profile._id
      user.profiles.push(profile)
      user.save()
      return profile
    } else {
      throw new Error("Cannot save profile", validateUser.error)
    }

  } catch (error) {
    console.error(error);
    // Handle the error appropriately (throw an error, log, etc.)
    throw new Error('Failed to create profile');
  }
};



export const markAsDefaultProfile = async (profileId: string, userId: string) => {
  try {
    await connectMongoDB();
      const updatedUser: UserType | null = await User.findByIdAndUpdate(
      userId,
      { $set:  { activeProfile: profileId }  },
      { new: true }
    );
    return NextResponse.json({ updatedUser }, {status: 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json( 'Can not make this profile default.' , {status: 500})
  }
}
 