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

function OverviewTab({ userID }: { userID: string }) {
	const activeProfile = useSelector((state: RootState) => state.activeProfile.profile)
	const shifts = useSelector((state: RootState) => state.shifts.shifts);
	const activeProfileShifts = shifts.filter((shift: ShiftType) => shift.userProfileId === activeProfile._id)

	const { niceWage, expectedWage, averageWage } = calculateWages(activeProfileShifts)

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
			<div className="w-full flex flex-col md:flex-row justify-evenly items-center my-4 p-0">
				{statsCards.map((card: any, index: number) => {
					return (
						<Suspense key={index} fallback={<CardSkeleton />}>
							<StatsCard title={card.title} icon={card.ico} data={card.data} />
						</Suspense>
					);
				})}
			</div>
			<div className="w-full flex items-center justify-between">
				<OverviewGraph />
				<UpComingShifts shifts={activeProfileShifts} />
			</div>
		</>
	);
}

export default OverviewTab;
