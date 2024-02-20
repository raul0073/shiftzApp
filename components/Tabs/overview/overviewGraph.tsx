import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ShiftType } from "@/models/shift";
import "./charts.scss";
import { niceDate } from "@/UI-Functions/prettyDate";
import { niceNumbers } from "@/UI-Functions/prettyNumbers";
const OverviewGraph = ({ shifts }: { shifts: ShiftType[] }) => {
	const data = shifts.map((shift: ShiftType) => ({
		date: shift.shiftDate,
		totalWage: shift.wage,
	}));

	// Sort the data by totalWage in descending order
	data.sort((a, b) => b.totalWage - a.totalWage);
	const maxWage = data[0].totalWage;
	const maxPresentage = "100px";
	return (
		<Card className="w-full h-fit min-h-[230px] mx-2 p-1 pb-1 overflow-hidden">
			<CardHeader className="p-4 mb-4">
				<CardTitle>Top five shifts</CardTitle>
			</CardHeader>
			<CardContent className="w-full p-0 flex mt-8 items-end justify-evenly">
				{shifts.slice(0, 5).map((shift: ShiftType, index: number) => (
					<div key={index} className="flex flex-col">
					  <small className="relative top-0">{niceNumbers(shift.wage)}₪</small>
						<div
							style={{ height: `${(shift.wage / maxWage) * 100}px` }}
							className="bg-primary rounded-t-sm p-1 flex flex-col items-center justify-end"
							key={index}>
							</div>
							<span className="text-muted-foreground bg-muted pt-1 text-xs text-center font-light italic">{new Date(shift.shiftDate).getUTCDate()}.{new Date(shift.shiftDate).getUTCMonth()}</span>
					
					</div>
				))}
			</CardContent>
			
		</Card>
	);
};

export default OverviewGraph;
