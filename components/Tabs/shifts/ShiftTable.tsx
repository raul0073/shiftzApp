import { niceDate } from "@/UI-Functions/prettyDate";
import { prettyHour } from "@/UI-Functions/prettyHour";
import { formatDateDifference } from "@/UI-Functions/timeDeff";
import { deleteShiftById } from "@/app/DB-Services/delShift";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { deleteShift } from "@/lib/features/ShiftsSlice";
import { ShiftType } from "@/models/shift";
import {
	Calendar,
	Check,
	EditIcon,
	HandCoins,
	Hourglass,
	Info,
	Timer,
	TimerOff,
	Trash2Icon,
} from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import PopoverWageInfo from "./PopoverWageInfo";
import PopoverEditShift from "./UpdateShiftComp";
import { niceNumbers } from '@/UI-Functions/prettyNumbers';
import UpdateShift from "./UpdateShiftComp";
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

function ShiftTable({
	activeProfileShifts,
	userID
}: {
	userID: string,
	activeProfileShifts: ShiftType[];
}) {
    const dispatch = useDispatch();
    const handleDelShift = (id: string) => {
        try{
            dispatch(deleteShift(id))
			deleteShiftById(userID, id)
        } catch(err){
            console.log(err)
            toast({title: "Error deleting shift. ❌"})
        }finally{
            toast({title: "Shift deleted. 🗑️"})
        }
    }


	return (
		<>
			<Table className="w-full text-center border-collapse p-1">
				{activeProfileShifts.length > 0 && (
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
											className={`flex   ${
												new Date(shift.shiftDate) < today
													? ""
													: "text-green-600"
											}`}>
												<span className="mr-1">

												{new Date(shift.shiftDate) < today ? <Check color="green" /> : ""}
												</span>

											{niceDate(shift.shiftDate)}
										</p>
										<small className="text-muted-foreground text-xs mt-2 italic">
											{formatDateDifference(shift.shiftDate)}
										</small>
									</TableCell>
									<td className="text-center">{prettyHour(shift.startTime)}</td>
									<td className="text-center">{prettyHour(shift.endTime)}</td>
									<td className="text-center">{prettyHour(shift.totalHrs)}</td>

									<td className="text-center font-semibold">
										{niceNumbers(shift.wage)}₪
										<div className="w-full flex justify-end">
											<Popover>
												<PopoverTrigger className="w-fit flex items-center justify-end">
													<Info className="text-blue-500 p-1" />
												</PopoverTrigger>
												<PopoverContent>
													<PopoverWageInfo shift={shift} />
												</PopoverContent>
											</Popover>
											<Trash2Icon
												width={20}
												color={"red"}
                                                onClick={()=> handleDelShift(shift._id as string)}
												className="cursor-pointer text-xs"
											/>
										<UpdateShift shift={shift} />
											
										</div>
									</td>
								</TableRow>
							))}
						</TableBody>
					</>
				)}
			</Table>
			{!activeProfileShifts.length && <h2 className="my-20 border border-muted-foreground border-dashed w-full min-h-[40vh] text-center flex justify-center items-center">Profile has no shifts for this month.</h2>}
		</>
	);
}

export default ShiftTable;
