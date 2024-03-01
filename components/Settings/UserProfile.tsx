"use client";
import { markAsDefaultProfile } from "@/Actions/CreateProfile";
import { deleteProfileFromDB } from "@/Actions/DelProfile";
import { deleteProfileStore } from "@/lib/features/ProfileSlice";
import { ProfileType } from "@/models/profile";
import { EditIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIconWithAlert from "../root/DeleteAlert";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import UpdateProfile from "@/app/(dashboard)/settings/(components)/UpdateProfile";
import { RootState } from "@/lib/store";
import { useEffect } from "react";

function UserProfile({
	profile,
	userId,
}: {
	profile: ProfileType;
	userId: string;
}) {
	const user = useSelector((state: RootState)=> state.users.user)
	const dispatch = useDispatch();
	const setProfileAsDefault = async (id: string) => {
		try {
			const res = await markAsDefaultProfile(id, userId);
			console.log(res);
		} catch (error) {
			console.log(error);
			toast({ title: `Error setting default user` });
		}finally{
			toast({title: 'Profile set as default.'})
		}

	};
	const deleteProfile = async (id: string | undefined) => {
		if (id) {
			try {
				dispatch(deleteProfileStore(id));
				const res = await deleteProfileFromDB(userId, id);
			} catch (error) {
				console.log(error);
				toast({ title: "Oops.. Problem deleting profile. ❌" });
			} finally {
				toast({ title: "Profile deleted! 🗑️" });
			}
		}
	};

	useEffect(()=> {},[user])
	return (
		<section className="userprofiles w-full my-2">
			{profile._id && (
			<div className={`w-full px-4 py-2 flex justify-between items-center bg-gray-100 dark:bg-gray-800 my-4 ${user.activeProfile?.toString() === profile._id.toString() ? 'border-[0.1px] border-primary' : ''}`}>
				<p className="flex flex-col">
					<span className="font-semibold text-foreground">{profile.name}</span>
					<span className="text-muted-foreground">{profile.workPlace}</span>
				</p>
				<div className="flex items-center justify-evenly">
					<UpdateProfile profile={profile} />
					<DeleteIconWithAlert deleteProfile={deleteProfile} id={String(profile._id)} />
						<AnimatedTooltip text="Set as default profile">
						{profile._id && user.activeProfile !== profile._id && (
						<Button
							variant={"ghost"}
							className=""
							onClick={() => setProfileAsDefault(String(profile._id))}>
							Set Default
						</Button>
						)}
					</AnimatedTooltip>
				</div>
			</div>
			)}
		</section>
	);
}

export default UserProfile;
