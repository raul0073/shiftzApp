import { filterShiftsByMonth } from "@/UI-Functions/filterShifts";
import { calculateWages } from "@/UI-Functions/prettyNumbers";
import { RootState } from "@/lib/store";
import { ShiftType } from "@/models/shift";
import { ActivityIcon, DollarSign, ProjectorIcon } from "lucide-react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import CardSkeleton from "../../Skeletons/CardSkeleton";
import UpComingShifts from "./comingShifts";
import OverviewGraph from "./overviewGraph";
import StatsCard from "./statsCard";
type ShiftsData = {
	niceWage: number;
	expectedWage: number;
	averageWage: number;
};

function OverviewTab() {
	const activeProfile = useSelector(
		(state: RootState) => state.activeProfile.profile
	);
	const month = new Date().getMonth() + 1;
	const shifts = useSelector((state: RootState) => state.shifts.shifts);
	const activeProfileShifts = filterShiftsByMonth(month, shifts)
	  .filter((shift: ShiftType) => shift.userProfileId === activeProfile._id);

	const { niceWage, expectedWage, averageWage } =
		calculateWages(activeProfileShifts);

	type StatsCard = {
		title: string;
		ico: React.ReactComponentElement<"svg">;
		data: number;
	};

	const statsCards = [
		{
			title: "Total Wage",
			ico: <DollarSign />,
			data: niceWage,
		},
		{
			title: "Expected Wage",
			ico: <ProjectorIcon />,
			data: expectedWage,
		},
		{
			title: "Daily Av.",
			ico: <ActivityIcon />,
			data: averageWage,
		},
	];
	return (
		<>
			{activeProfileShifts.length > 0 ? (
				<>
					<div className="w-full flex flex-col md:flex-row justify-evenly items-center my-4 p-1">
						{statsCards.map((card: any, index: number) => {
							return (
								<Suspense key={index} fallback={<CardSkeleton />}>
									<StatsCard
										title={card.title}
										icon={card.ico}
										data={card.data}
									/>
								</Suspense>
							);
						})}
					</div>
					<div className="w-full flex flex-col md:flex-row items-center justify-center space-y-4">
						<OverviewGraph shifts={activeProfileShifts} />
						<UpComingShifts shifts={activeProfileShifts} />
					</div>
				</>
			) : (
				<h2 className="w-full text-center my-12">
					Profile has no shifts for this month.
				</h2>
			)}
		</>
	);
}

export default OverviewTab;
