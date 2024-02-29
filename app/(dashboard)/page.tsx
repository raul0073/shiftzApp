import { initUser } from "@/Actions/UserInit";
import Dashboard from "@/components/root/Dashboard";
import { UserType } from "@/models/user";
import { redirect } from "next/navigation";

export default async function Home() {
	const user: UserType = await initUser();
	if (!user) {
		redirect('/')
	}
	const userId = String(user?._id);
	const parsedUser = JSON.parse(JSON.stringify(user));
	return (
		<main className="flex justify-center flex-col items-center min-h-screen">
			<Dashboard userId={userId} user={parsedUser} />
		</main>
	);
}
