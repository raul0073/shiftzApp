"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import secureLocalStorage from "react-secure-storage";
import useZodValidation from "@/Hooks/useZodValidation";
import { addProfile } from "@/schema/profile";
import { toast } from "../ui/use-toast";

function Step2() {
	const [selected, setSelected] = useState<number | null>(null);
	const options = ["I work in shifts", "I work globly"];
	const { previousStep, nextStep, activeStep, stepCount } = useWizard();
	const { formData, validationErrors, validateField } = useZodValidation(
		{
			workPlace: "",
			type: true,
			hrWage: 0,
			push: false,
		},
		addProfile
	);

	const stepHandler = async (index: number) => {
		setSelected(index);
		try {
			await validateField("type", formData.type);
			nextStep();
		} catch (error) {
			toast({ title: "Oops... try again" });
		}
	};

	return (
		<>
			<Card className="w-fit h-[35vh] lg:w-1/3 flex flex-col justify-between p-2">
				<CardHeader>
					<CardTitle className="text-2xl font-extrabold">
						Which type describes you the{" "}
						<span className="text-primary">most</span>?
					</CardTitle>
				</CardHeader>
				<CardContent className="h-full flex w-full justify-evenly">
					{options.map((item: string, index: number) => {
						return (
							<div
								key={index}
								onClick={() => setSelected(index)}
								className={`${
									selected === index ? "border-blue-950 border-2" : ""
								} w-fit h-20 flex flex-col items-center justify-center text-center text-pretty bg-gray-100 rounded-md p-4 cursor-pointer hover:bg-gray-50`}>
								{item}
								<div>
									{validationErrors && (
										<div className="w-full text-red-600 text-xs pt-2 px-1">
											{validationErrors.message}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</CardContent>
				<CardFooter className="flex justify-between items-center w-full">
					<AnimatedTooltip text="Go back">
						<Button onClick={() => previousStep()}>
							<ArrowLeftIcon />
						</Button>
					</AnimatedTooltip>
					<AnimatedTooltip text="Keep going">
						<Button onClick={() => nextStep()}>
							<ArrowRightIcon />
						</Button>
					</AnimatedTooltip>
				</CardFooter>
				<div className="w-full flex justify-center">
					<span className="w-[40px] h-[.3rem] rounded-xl bg-gray-300"></span>
					<span className="w-[40px] h-[.3rem] rounded-xl bg-gray-800"></span>
					<span className="w-[40px] h-[.3rem] rounded-xl bg-gray-300"></span>
				</div>
			</Card>
		</>
	);
}
export default Step2;
