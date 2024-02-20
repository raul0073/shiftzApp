"use client";
import { niceDate } from "@/UI-Functions/prettyDate";
import { prettyHour } from "@/UI-Functions/prettyHour";
import { formatDateDifference } from "@/UI-Functions/timeDeff";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { RootState } from "@/lib/store";
import { ShiftType } from "@/models/shift";
import {
	Calendar,
	HandCoins,
	Hourglass,
	Info,
	Timer,
	TimerOff,
} from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import PopoverWageInfo from "./PopoverWageInfo";

function AllShiftsComp() {
	const shiftsStore = useSelector((state: RootState) => state.shifts.shifts);
	const activeProfile = useSelector(
		(state: RootState) => state.activeProfile.profile
	);
	const activeProfileShifts = shiftsStore
		.filter(
			(shift: ShiftType) =>
				shift.userProfileId?.toString() === activeProfile._id?.toString()
		)
		.sort((a: ShiftType, b: ShiftType) => {
			const dateA = new Date(a.shiftDate).getTime();
			const dateB = new Date(b.shiftDate).getTime();

			return dateB - dateA;
		});

	const today = new Date();

	type headerType = {
		label: string;
		icon: React.ReactNode;
	};
	const headers = [
		{
			label: "Date",
			icon: <Calendar />,
		},
		{ label: "Start", icon: <Timer /> },
		{ label: "End", icon: <TimerOff /> },
		{ label: "Total", icon: <Hourglass /> },
		{ label: "Amount", icon: <HandCoins /> },
	];
	useEffect(() => {}, [activeProfileShifts, shiftsStore]);
	return (
		<>
			<Table className="w-full text-center border-collapse p-1">
				{activeProfileShifts.length ? (
					<>
						<TableCaption className="py-4 text-left">
							A list of your profile shifts.
						</TableCaption>
						<TableHeader className="border-b border-muted-foreground text-muted-foreground">
							<TableRow>
								{headers.map((header: headerType, index: number) => {
									return (
										<TableHead className="text-center" key={index}>
											<span
												className={`flex ${
													index === 0 ? "justify-start" : "justify-center"
												} items-center text-center`}>
												<span className="mx-1">{header.icon}</span>
												{header.label}
											</span>
										</TableHead>
									);
								})}
							</TableRow>
						</TableHeader>
						<TableBody>
							{activeProfileShifts.map((shift: ShiftType, index: number) => (
								<TableRow key={index} className="border-b border-muted">
									<TableCell className="text-left flex flex-col">
										<p
											className={`${
												new Date(shift.shiftDate) < today
													? "line-through text-red-800"
													: "text-green-600"
											}`}>
											{niceDate(shift.shiftDate)}
										</p>
										<small className="text-muted-foreground text-xs">
											{formatDateDifference(shift.shiftDate)}
										</small>
									</TableCell>
									<td className="text-center">{prettyHour(shift.startTime)}</td>
									<td className="text-center">{prettyHour(shift.endTime)}</td>
									<td className="text-center">{prettyHour(shift.totalHrs)}</td>

									<td className="text-center items-center">
										{shift.wage}₪
										<Popover>
											<PopoverTrigger className="w-full flex items-center justify-end">
												<Info className="text-primary p-1" />
											</PopoverTrigger>
											<PopoverContent>
												<PopoverWageInfo shift={shift} />
											</PopoverContent>
										</Popover>
									</td>
								</TableRow>
							))}
						</TableBody>
					</>
				) : (
					<h2 className="w-full text-center">No shifts found</h2>
				)}
			</Table>
		</>
	);
}

export default AllShiftsComp;
