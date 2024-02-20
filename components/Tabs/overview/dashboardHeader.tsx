"use client";
import { RootState } from "@/lib/store";
import { ProfileType } from "@/models/profile";
import { UserButton } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectProfileComp } from "../../UserSelect";
import { Separator } from "../../ui/separator";
import { Skeleton } from "../../ui/skeleton";
import { toggleProfile } from "@/lib/features/ActiveProfileSlice";
import DashboardHeaderSkeleton from "../../Skeletons/DashboardHeader";

function Header() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [activeProfileState, setActiveProfileState] = useState<
		ProfileType | undefined
	>();
	const user = useSelector((state: RootState) => state.users.user);
	const profilesList = useSelector(
		(state: RootState) => state.profiles.profiles
	);
	const activeProfileStore = useSelector(
		(state: RootState) => state.activeProfile.profile
	);

	const handleProfileChangeSelect = (profile: ProfileType) => {
		setActiveProfileState(profile);
		dispatch(toggleProfile(profile));
	};

	useEffect(() => {
		if (activeProfileState === undefined) {
			const defaultProfile = profilesList.find(
				(prof: ProfileType) => prof._id === user.activeProfile
			);
			setActiveProfileState(defaultProfile);
		} else {
			return;
		}
	}, [
		activeProfileState,
		setActiveProfileState,
		profilesList,
		user.activeProfile,
		activeProfileStore
	]);

	return (
		<div className="w-full h-fit">
			<div className="w-full flex p-4 justify-between items-center">
				<div className="flex">
					<UserButton />
				</div>
				<div className="w-full flex px-2 justify-start flex-col">
					{user.fullName ? (
					<>
						<p className="font-semibold">{`${user.fullName}`}</p>
							<small className="text-xs text-muted-foreground">
						{activeProfileState?.name} | {activeProfileState?.workPlace}
					</small>
					</>
					) : (
						<DashboardHeaderSkeleton />
					)}
				
				</div>
				<SelectProfileComp
					profiles={profilesList}
					handleProfileChangeSelect={handleProfileChangeSelect}
				/>
			</div>
			<Separator />
		</div>
	);
}

export default Header;
