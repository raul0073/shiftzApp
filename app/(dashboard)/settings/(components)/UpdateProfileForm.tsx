"use client";
import { createProfile } from "@/Actions/CreateProfile";
import AddProfileForm from '@/components/Settings/AddProfileForm';
import { toast } from "@/components/ui/use-toast";
import { addProfileStore } from "@/lib/features/ProfileSlice";
import { RootState } from '@/lib/store';
import { ProfileType } from "@/models/profile";
import { addProfile, addProfileSchema } from "@/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function UpdateProfileForm({profile}:{profile: ProfileType}) {
const user = useSelector((state: RootState) => state.users.user)
const profiles = useSelector((state: RootState) => state.profiles.profiles)

const dispatch = useDispatch()
const labels = ["Profile Name", "Work Place", "Hourly Wage"];
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<addProfileSchema>({ resolver: zodResolver(addProfile) });

	const onSubmit = async (data: addProfileSchema) => {
		try {
			const res = addProfile.safeParse(data);
			if (res.success) {
				const response = await createProfile(user._id, data);
				dispatch(addProfileStore(response))
			}
		} catch (error) {
			console.log(error);
			toast({ title: "Error! Can not add profile" });
		} finally {

			reset();
			toast({ title: "Profile added!" });
		}
	};
  return (
    <AddProfileForm userId={user._id} profileData={profile} />
  )
}

export default UpdateProfileForm




