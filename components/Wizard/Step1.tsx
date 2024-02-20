"use client";
import useZodValidation from "@/Hooks/useZodValidation";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useWizard } from "react-use-wizard";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "../ui/card";
import { Input } from "../ui/input";
import { addProfile } from "@/schema/profile";
import { toast } from "../ui/use-toast";

function Step1() {
	const { handleStep, previousStep, nextStep, activeStep, stepCount } =
		useWizard();
	const { formData, validationErrors, validateField } = useZodValidation(
		{
			name: '',
			workPlace: '',
			hrWage: 0,
			push: false,
		},
		addProfile
	);

const stepHandler = async () => {
  try {
    await validateField('name', formData.name);
    nextStep();
  } catch (error) {
    toast({ title: 'Oops... try again' });
  }
};
	return (
		<>
			<Card className="w-fit h-[35vh] lg:w-1/3 flex flex-col justify-between p-2">
				<CardHeader>
					<CardTitle className="text-2xl font-extrabold">
						How should we call you?
					</CardTitle>
				</CardHeader>
				<CardContent className="h-full">
					<Input
						type="text"
						required
						placeholder="Keep it real"
						defaultValue={formData.name}
						onChange={(e) => validateField('name', e.target.value)}
					/>
					{validationErrors && (
						<div className="w-full text-red-600 text-xs pt-2 px-1">
							{validationErrors.message}
						</div>
					)}
				</CardContent>
				<CardFooter className="flex justify-end items-center w-full">
					<AnimatedTooltip text="Continue">
						<Button onClick={stepHandler}>
							<ArrowRightIcon />
						</Button>
					</AnimatedTooltip>
				</CardFooter>
				<div className="w-full flex justify-center">
					<span className="w-[40px] h-[.3rem] rounded-xl bg-gray-800"></span>
					<span className="w-[40px] h-[.3rem] rounded-xl bg-gray-300"></span>
					<span className="w-[40px] h-[.3rem] rounded-xl bg-gray-300"></span>
				</div>
			</Card>
		</>
	);
}

export default Step1;
