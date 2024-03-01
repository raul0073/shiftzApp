"use client";
import { RootState } from "@/lib/store";
import { ShiftType } from "@/models/shift";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShiftTable from "./ShiftTable";
import { filterShiftsByMonth } from "@/UI-Functions/filterShifts";

function AllShiftsComp({userID}: {userID: string}) {
	const shiftsStore = useSelector((state: RootState) => state.shifts.shifts);
	const activeProfile = useSelector((state: RootState) => state.activeProfile.profile);
  
	// State for the selected month
	const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  
	// Filter shifts based on the selected month and active profile
	const activeProfileShifts = filterShiftsByMonth(selectedMonth, shiftsStore)
	  .filter((shift: ShiftType) => shift.userProfileId === activeProfile._id);
  
	useEffect(() => {
	  // Additional logic or side effects when activeProfileShifts or shiftsStore changes
	}, [activeProfileShifts, shiftsStore, activeProfile]);

	// Handler for changing the selected month
	const handleMonthChange = (value: string) => {
		const month = parseInt(value, 10); // Parse string to integer
		setSelectedMonth(month);
	};
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return (
		<>
			<div className="w-full flex justify-end items-center mb-4">
				<Select 
				onValueChange={(value) => handleMonthChange(value)}>
					<SelectTrigger className="w-1/2">
						<SelectValue placeholder="Select month" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Select month to display</SelectLabel>
							{monthNames.map((monthName, index) => (
								<SelectItem 
								value={`${index + 1}`} 
								key={index}
								 className={`${selectedMonth === index +1 ? 'text-primary': ''}`}>
									{monthName}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<ShiftTable activeProfileShifts={activeProfileShifts} userID={userID}/>
		</>
	);
}

export default AllShiftsComp;
