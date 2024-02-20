import React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AnimatedTooltip } from "../ui/animated-tooltip";

function DeleteIconWithAlert({
	deleteProfile,
	id,
}: {
	deleteProfile: any;
	id: string;
}) {
	return (
		<AnimatedTooltip text="Delete Profile">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Trash2 color="red" cursor={"pointer"} className="mx-1"/>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete this
							profile and all shifts associated with it.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={() => deleteProfile(id)}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</AnimatedTooltip>
	);
}

export default DeleteIconWithAlert;
