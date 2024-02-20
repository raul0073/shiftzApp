"use client";
import { getAllShifts } from "@/app/DB-Services/getAllShifts";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toggleProfile } from "@/lib/features/ActiveProfileSlice";
import { addProfileStore } from "@/lib/features/ProfileSlice";
import { addShift } from "@/lib/features/ShiftsSlice";
import { addUser } from "@/lib/features/UserSlice";
import { RootState } from "@/lib/store";
import { ProfileType } from "@/models/profile";
import { ShiftType } from "@/models/shift";
import { UserType } from "@/models/user";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsTab from "../Tabs/analytics/analyticsTab";
import CalendarTab from "../Tabs/calendar/calendarTab";
import Header from "../Tabs/overview/dashboardHeader";
import OverviewTab from "../Tabs/overview/overviewTab";
import ShiftsTab from "../Tabs/shifts/shiftsTab";
import { Button } from "../ui/button";
import AddProfileBtn from "./AddProfileBtn";
function Dashboard({ userId, user }: { userId: string; user: UserType }) {
	const [tabSelected, setTabSelected] = useState<string>("overview");
	const today = new Date().toDateString();
	const dispatch = useDispatch();
	const profs = useSelector((state: RootState) => state.profiles.profiles)

	useEffect(() => {
		dispatch(addUser(user));
		user.profiles.forEach((prof: ProfileType) => dispatch(addProfileStore(prof)));
		const fetchShifts = async () => {
			try {
				const shifts = await getAllShifts(userId);

				if (shifts.length > 0) {
					// Dispatch the addShift action for each shift
					shifts.forEach((shift: ShiftType) => {
						dispatch(addShift(shift));
					});
				}
			} catch (error) {
				console.error(error);
			}
		};
		const profile = profs.find((profile: ProfileType) => profile._id === user.activeProfile)
		if(profile){
		dispatch(toggleProfile(profile))
		}
		fetchShifts();
	}, [userId, dispatch, user.profiles, user, profs]);


	if (user.profiles.length !== 0) {
		return (
			<Card className="w-[98%] lg:w-[70%] min-h-[90vh] shadow-md shadow-gray-300 dark:shadow-gray-600  my-8 overflow-hidden">
				<Header />
				<CardHeader className="my-4 w-full lg:p-6 p-1">
					<CardTitle className="flex justify-between items-center">
						<p className="text-2xl font-bold my-4">
							{tabSelected.toUpperCase()}
						</p>
						<p className="text-muted-foreground">{today}</p>
					</CardTitle>
					{user.profiles.length === 0 && <AddProfileBtn userId={userId} />}
					<Tabs defaultValue={"overview"}>
						<TabsList className="border">
							<TabsTrigger
								onClick={(e) => setTabSelected("overview")}
								value="overview">
								Overview
							</TabsTrigger>
							<TabsTrigger
								onClick={(e) => setTabSelected("analytics")}
								value="analytics">
								Analytics
							</TabsTrigger>
							<TabsTrigger
								onClick={(e) => setTabSelected("calendar")}
								value="calendar">
								Calendar
							</TabsTrigger>
							<TabsTrigger
								onClick={(e) => setTabSelected("shifts")}
								value="shifts">
								Shifts
							</TabsTrigger>
						</TabsList>
					</Tabs>
					{userId && (
						<CardContent className="p-0 min-h-[50vh]">
							{tabSelected === "overview" && (
								<motion.div
									initial={{ opacity: 0, x: 80 }}
									whileInView={{ x: 0, opacity: 1 }}
									transition={{ duration: 0.5 }}>
									<OverviewTab userID={userId} />
								</motion.div>
							)}
							{tabSelected === "calendar" && (
								<motion.div
									initial={{ opacity: 0, x: 80 }}
									whileInView={{ x: 0, opacity: 1 }}
									transition={{ duration: 0.5 }}>
									<CalendarTab />
								</motion.div>
							)}
							{tabSelected === "analytics" && (
								<motion.div
									initial={{ opacity: 0, x: -80 }}
									whileInView={{ x: 0, opacity: 1 }}
									transition={{ duration: 0.5 }}>
									<AnalyticsTab />
								</motion.div>
							)}
							{tabSelected === "shifts" && (
								<motion.div
									initial={{ opacity: 0, x: 80 }}
									whileInView={{ x: 0, opacity: 1 }}
									transition={{ duration: 0.5 }}>
									<ShiftsTab userID={userId} />
								</motion.div>
							)}
						</CardContent>
					)}
					<CardFooter className="w-full p-2 flex justify-center items-center"></CardFooter>
				</CardHeader>
			</Card>
		);
	} else {
		return (
			<div className="w-[90%] lg:w-1/2 border-2 border-dashed border-lg min-h-[30vh] flex justify-center items-center flex-col">
				<h2 className="text-3xl font-semibold text-pretty p-2 text-center">
					You have no profiles to present
				</h2>
				<Button variant={"link"} className="my-4">
					<Link href={`/settings`}>Go to settings to create one</Link>
				</Button>
			</div>
		);
	}
}

export default Dashboard;
