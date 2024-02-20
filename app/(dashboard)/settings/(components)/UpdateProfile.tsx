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
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { ProfileType } from "@/models/profile";
import { EditIcon } from "lucide-react";
import UpdateProfileForm from "./UpdateProfileForm";

function UpdateProfile({
	profile,
}: {
	profile: ProfileType;
}) {
	return (
		<AnimatedTooltip text="Edit Profile">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<EditIcon color="green" cursor={"pointer"} className="mx-2" />
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
                    <UpdateProfileForm profile={profile}/>
					</AlertDialogHeader>
					<AlertDialogFooter className="justify-start flex-row">
						<AlertDialogCancel>Cancel</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</AnimatedTooltip>
	);
}

export default UpdateProfile;
