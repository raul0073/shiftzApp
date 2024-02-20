"use client";
import AddProfileBtn from "@/components/root/AddProfileBtn";
import AddProfileForm from "@/components/Settings/AddProfileForm";
import UpdateUserForm from "@/components/Settings/UpdateUserForm";
import UserProfile from "@/components/Settings/UserProfile";
import ThemeSwitcher from "@/components/root/ThemeSwitcher";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/lib/store";
import { ProfileType } from "@/models/profile";
import { UserType } from "@/models/user";
import { useState } from "react";
import { useSelector } from "react-redux";

function Page() {
	const [addProfileForm, setAddProfileForm] = useState<boolean>(false);
	const user: UserType = useSelector((state: RootState) => state.users.user);
	const profiles: ProfileType[] = useSelector(
		(state: RootState) => state.profiles.profiles
	);
	return (
		<section className="w-full flex justify-center my-12">
			<Card className="w-[90%] lg:w-[70%]">
				<CardHeader>
					<CardTitle className="text-xl font-semibold">User Settings</CardTitle>

					{user && (
						<CardDescription className="w-full flex justify-between">
							{user.email}

							<Avatar className="w-[100px] h-[100px] mr-[-2rem] md:w-[150px] md:mr-[-3rem] md:h-[150px] mt-[-5rem] lg:mr-[-3rem] shadow-md shadow-black">
								<AvatarImage
									src={user.imageUrl}
									className="object-cover"></AvatarImage>
							</Avatar>
						</CardDescription>
					)}
				</CardHeader>
				<Separator />

				<div className="w-[90%] border-1 rounded-sm  mx-auto">
					<CardContent className="p-2 md:p-4">
						<CardDescription className="my-4">Interface</CardDescription>
						<div className="w-full border-1 rounded-sm  mx-auto flex justify-between py-4 ">
							Theme settings
							<ThemeSwitcher />
						</div>
						<Separator />
						<CardDescription className="my-4">Account</CardDescription>
						<div className="w-full border-1 rounded-sm  mx-auto flex justify-between py-4 ">
							<UpdateUserForm user={user} />
						</div>
						<Separator />
						<CardDescription className="my-4">Profiles</CardDescription>
						<div className="w-full border-1 rounded-sm  mx-auto flex justify-between py-4 ">
							<div className="w-[90%] border-1 rounded-sm  mx-auto">
								<CardContent className="p-2 md:p-4">
									{profiles.length === 0 ? (
										<AddProfileBtn userId={user._id} />
									) : (
										profiles.map((item: ProfileType, index: number) => {
											return (
												<UserProfile
													key={`${item._id?.toString()}-${index}`}
													profile={item}
													userId={user._id}
												/>
											);
										})
									)}
								</CardContent>
							</div>
						</div>
					</CardContent>
					<Separator />
				</div>

				<CardContent></CardContent>
				<CardFooter className="mt-12 flex justify-center items-center mb-12">
					{profiles.length > 0 && !addProfileForm && (
						<Button onClick={() => setAddProfileForm(true)}>
							Add new profile
						</Button>
					)}
					{addProfileForm && (
						<AddProfileForm userId={user._id} setOpen={setAddProfileForm} />
					)}
				</CardFooter>
			</Card>
		</section>
	);
}

export default Page;
