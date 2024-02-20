"use client";
import { SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

function Navbar() {
	const router = useRouter();
	return (
		<section className="w-full lg:w-[70%] lg:mx-auto flex justify-between items-center p-4">
			<Logo />
			<SettingsIcon
				className="cursor-pointer hover:rotate-180 transition-transform duration-100"
				onClick={() => router.push(`/settings`)}
			/>
		</section>
	);
}

export default Navbar;
