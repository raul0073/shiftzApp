'use client'
import { useState } from "react";
import AddProfileForm from "../Settings/AddProfileForm";
import { Button } from "../ui/button";

function AddProfileBtn({userId}: {userId: string}) {
const [open, setOpen] = useState<boolean>(false)
	return (
		open ?(
            <AddProfileForm userId={userId} setOpen={setOpen} />
        ) : (
            <span className="min-h-[30vh] border-dashed border-2 border-primary rounded-sm w-full p-12 justify-center items-center flex cursor-pointer hover:bg-muted">
			<Button variant={'link'} onClick={()=> setOpen(!open)}>Create new profile</Button>
		</span>
        
        )
	);
}

export default AddProfileBtn;
