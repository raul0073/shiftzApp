"use client";
import { addShiftToUser } from "@/app/DB-Services/addShift";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { addShift } from "@/lib/features/ShiftsSlice";
import { RootState } from "@/lib/store";
import { ShiftType } from "@/models/shift";
import { addShiftZod } from "@/schema/shift";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";


function AddShiftForm({setOpen} :{setOpen: Dispatch<SetStateAction<boolean>>}) {
	const user = useSelector((state: RootState) => state.users?.user);
	const profile = useSelector((state: RootState) => state.activeProfile.profile)
	const dispatch = useDispatch();
	const today = new Date();

	const form = useForm<z.infer<typeof addShiftZod>>({
		resolver: zodResolver(addShiftZod),
	});

	async function onSubmit(values: z.infer<typeof addShiftZod>) {
		try {
			console.log(values);
			if(profile._id){
			const { newShift }: ShiftType | any = await addShiftToUser(
				user._id,
				values,
				profile._id
			)
			dispatch(addShift(newShift));
			}
		} catch (error) {
			console.log(error);
			toast({ title: "Oops... Can not add shift ❌" });
		} finally {
			setOpen(false)
			toast({ title: "Shift added successfully 👍" });
		}
	}
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.1 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, ease: "backInOut" }}
			className="w-full p-2 mb-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="shiftDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Shift Date</FormLabel>
								<FormControl>
									<Input type="date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="startTime"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Start Time</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="endTime"
						render={({ field }) => (
							<FormItem>
								<FormLabel>End Time</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="w-full flex justify-end">
						<Button type="submit">Add Shift</Button>
					</div>
				</form>
			</Form>
	

			<div className="w-full flex justify-end"></div>
		</motion.div>
	);
}

export default AddShiftForm;
