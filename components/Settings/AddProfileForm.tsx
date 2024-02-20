"use client";
import { createProfile } from "@/Actions/CreateProfile";
import { ProfileType } from "@/models/profile";
import { addProfile, addProfileSchema } from "@/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";
import { useDispatch } from "react-redux";
import { addProfileStore } from "@/lib/features/ProfileSlice";

const labels = ["Profile Name", "Work Place", "Hourly Wage"];
type PropsAddProfile = {
	userId: string;
	setOpen?: Dispatch<SetStateAction<boolean>>;
	profileData?: ProfileType;
};
function AddProfileForm({ userId, setOpen, profileData }: PropsAddProfile) {
	const dispatch = useDispatch();
	const [profile, setProfile] = useState<ProfileType>({
		name: "",
		workPlace: "",
		hrWage: 0,
		type: true,
		totalHrs: 0,
	});

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
				const response = await createProfile(userId, data);
				dispatch(addProfileStore(response));
			}
		} catch (error) {
			console.log(error);
			toast({ title: "Error! Can not add profile" });
		} finally {
			if (setOpen) {
				setOpen(false);
			}
			reset();
			toast({ title: "Profile added!", description: 'You can now add shifts for this profile.' });
		}
	};
	return (
		<div className="w-full p-2 mb-8 userprofiles">
			<h2 className="text-center text-2xl font-semibold mb-8">
				{profileData ? "Update Profile" : "Add new profile"}
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto">
				<div className="my-2">
					<Label>{labels[0]}</Label>
					<Input
						{...register(`name`)}
						defaultValue={profileData?.name}
						placeholder="Lawyer"
						type="text"
						onChange={(e) => setProfile({ ...profile, name: e.target.value })}
					/>
					{errors.name && (
						<p className="text-xs text-red-700">{errors.name.message}</p>
					)}
				</div>
				<div className="my-2">
					<Label>{labels[1]}</Label>
					<Input
						{...register(`workPlace`)}
						defaultValue={profileData?.workPlace}
						placeholder="Google"
						type="text"
						onChange={(e) =>
							setProfile({ ...profile, workPlace: e.target.value })
						}
					/>
					{errors.workPlace && (
						<p className="text-xs text-red-700">{errors.workPlace.message}</p>
					)}
				</div>
				<div className="my-2">
					<Label>{labels[2]}</Label>
					<Input
						{...register(`hrWage`)}
						defaultValue={profileData?.hrWage}
						type="numbers"
						placeholder="50"
						onChange={(e) =>
							setProfile({ ...profile, hrWage: +e.target.value })
						}
					/>
					{errors.hrWage && (
						<p className="text-xs text-red-700">{errors.hrWage.message}</p>
					)}
				</div>
				<div className="w-full flex justify-between my-4">
					{setOpen && (
						<Button
							variant={"secondary"}
							className="px-8"
							onClick={() => setOpen(false)}>
							Cancel
						</Button>
					)}
					<Button type="submit" className="px-8 w-full mx-4">
						{profileData ? "Update" : "Add"}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddProfileForm;
