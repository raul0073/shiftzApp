"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import AddShiftForm from "./AddShiftForm";

function AddShift() {
	const [openForm, setOpenForm] = useState<boolean>(false);
	return (
		<div className="w-full md:w-1/2 flex flex-col mx-auto">

			
			<Button variant={"secondary"} onClick={() => setOpenForm(!openForm)} className="w-30 h-30 rounded-full">
				
				{openForm ? (<MinusIcon />) : (<span className="flex items-center p-2"><PlusIcon /> New shift</span>)}
			</Button>
		<div className="w-full flex flex-col">
			{openForm && <AddShiftForm setOpen={setOpenForm} />}
			</div>
		</div>
	);
}

export default AddShift;
