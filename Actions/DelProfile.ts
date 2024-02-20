'use server'
import connectMongoDB from '@/lib/mongoDB';
import Shift from '@/models/shift';
import User, { UserType } from '@/models/user';
import { ObjectId } from 'mongodb';

export const deleteProfileFromDB = async (userId: string, profileId: string) => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Use findByIdAndUpdate to update the profiles array
    const updatedUser: UserType | null = await User.findByIdAndUpdate(
      userId,
      { $pull: { profiles: { _id: profileId } } },
      { new: true }
    );
  
     await Shift.deleteMany({ userProfileId: new ObjectId(profileId)})
     
    if (!updatedUser) {
      throw new Error("Can't find user");
    }

    return 'Profile deleted';

  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete profile');
  }
};

