import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { ShiftType } from "@/models/shift";
import { EditIcon } from "lucide-react";
import UpdateShiftForm from "./UpdateShiftForm";

function UpdateShift({
	shift,
}: {
	shift: ShiftType;
}) {
	return (

			<AlertDialog>
				<AlertDialogTrigger asChild>
					<EditIcon color="green" cursor={"pointer"} className="mx-2" width={20} />
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
                    <UpdateShiftForm shift={shift} />
					</AlertDialogHeader>
					<AlertDialogFooter className="sm:justify-start">
						<AlertDialogCancel>Cancel</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
	);
}

export default UpdateShift;
