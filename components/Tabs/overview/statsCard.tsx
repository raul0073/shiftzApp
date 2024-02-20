import React, { Suspense } from "react";
import CardSkeleton from "../../Skeletons/CardSkeleton";
import { Card, CardDescription, CardHeader } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

function StatsCard({
	title,
	data,
	icon,
}: {
	title: string;
	data: any;
	icon: React.ReactComponentElement<"svg">;
}) {


	return (
	
	<Suspense key={title} fallback={<CardSkeleton />}>
			<Card className="w-full p-1 mx-2 my-4 md:my-0">
				<CardHeader className="p-4">
					<span className="w-full px-2 flex items-center justify-between">
						<p className="text-sm font-semibold">{title}</p>
						<span className="text-primary">{icon}</span>
					</span>
					{data ? (<span className="w-full px-2 flex items-center font-bold">{data}₪</span>): (<Skeleton className="w-1/3 h-3 rounded-lg bg-muted"></Skeleton>)}
					<p className="text-xs text-muted-foreground">+ 18% from last month</p>
				</CardHeader>
				<CardDescription></CardDescription>
			</Card>
		</Suspense>
	)	

}

export default StatsCard;
