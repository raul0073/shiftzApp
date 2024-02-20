"use client";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Logo() {
	const router = useRouter();

	return (
		<div className="flex items-center cursor-pointer group">
			<span
				className="group text-primary mr-2 text-2xl md:text-3xl font-extrabold items-center flex transition duration-50 transform"
				onClick={() => router.push('/')}>
				<span className="hidden transition duration-100 -z-10 transform group-hover:translate-x-[-2px] group-hover:flex">
					<ArrowBigLeft />
				</span>
			SHIFTER
			</span>
		</div>
	);
}

export default Logo;
