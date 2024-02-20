"use client";
import { UserType } from "@/models/user";
import { updateUser, updateUserSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { BellIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

function UpdateUserForm({ user }: { user: UserType }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<updateUserSchema>({ resolver: zodResolver(updateUser) });

	const onSubmit = async (data: updateUserSchema) => {
		console.log(data);
		reset();
	};

	return (
		<div className="w-full p-2 mb-8">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="w-full p-1 my-1">
					<Label>Full Name</Label>
					<Input
						{...register("fullName")}
						type="text"
						defaultValue={user.fullName}
						onChange={(e) => setValue("fullName", e.target.value)}
					/>
					{errors.fullName && (
						<p className="text-xs text-red-700">{errors.fullName.message}</p>
					)}
				</div>
				<div className="w-full p-1 my-1">
					<Label>Avatar Url</Label>
					<Input
						{...register("imageUrl")}
						type="text"
						defaultValue={user.imageUrl}
						onChange={(e) => setValue("imageUrl", e.target.value)}
					/>
					{errors.imageUrl && (
						<p className="text-xs text-red-700">{errors.imageUrl.message}</p>
					)}
				</div>
				<div className="flex items-center space-x-4 rounded-md border p-4 my-8">
					<BellIcon />
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium leading-none">
							Push Notifications
						</p>
						<p className="text-sm text-muted-foreground">
							Send me notifications
						</p>
					</div>
					<Switch defaultChecked={user.push} {...register("push")} />
				</div>
				<div className="w-full flex justify-end">
					<Button type="submit" variant={'secondary'}>Update</Button>
				</div>
			</form>
			<div className="w-full flex justify-end"></div>
		</div>
	);
}

export default UpdateUserForm;
