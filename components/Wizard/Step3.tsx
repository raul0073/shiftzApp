"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useWizard } from "react-use-wizard";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { profileSchema } from "@/models/profile";
import { addProfile } from "@/schema/profile";
import useZodValidation from "@/Hooks/useZodValidation";
import { createProfile } from "@/Actions/CreateProfile";

function Step3({ id }: { id: string }) {
	const router = useRouter();
	const { handleStep, previousStep, nextStep, activeStep, stepCount } =
		useWizard();
	const { formData, validationErrors, validateField } = useZodValidation(
		profileSchema,
		addProfile
	);

	const stepHandler = async () => {
		try {
			await validateField("workPlace", formData.workPlace);
			await validateField("hrWage", formData.hrWage);
		} catch (error) {
			console.log(error);
		} finally {
			const prof = formData;
			await createProfile(id, prof);
		}
	};

	return (
		<>
			<Card className="w-fit h-fit min-h-[35vh] lg:w-1/3 flex flex-col justify-between p-2">
				<CardHeader>
					<CardTitle className="text-2xl font-extrabold">
						Profile details{" "}
					</CardTitle>
					<CardDescription>Final step and you are ready!</CardDescription>
				</CardHeader>
				<CardContent className="h-full">
					<Label>Work place</Label>
					<Input type="text" placeholder="Google" className="w-2/3" />
					<Label>Hourly wage</Label>
					<Input type="numbers" placeholder="50" className="w-2/3" />
					<div>
						{validationErrors && (
							<div className="w-full text-red-600 text-xs pt-2 px-1">
								{validationErrors.message}
							</div>
						)}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between items-center w-full">
					<AnimatedTooltip text="Go back">
						<Button onClick={() => previousStep()}>
							<ArrowLeftIcon />
						</Button>
					</AnimatedTooltip>
					<AnimatedTooltip text="Keep going">
						<Button onClick={() => stepHandler()}>
							<ArrowRightIcon />
						</Button>
					</AnimatedTooltip>
				</CardFooter>
				<div className="w-full flex justify-center">
					<span className="w-[40px] h-[.3rem] rounded-xl bg-gray-300"></span>
					<span className="w-[40px] h-[.3rem] rounded-xl bg-gray-300"></span>
					<span className="w-[40px] h-[.3rem] rounded-xl bg-gray-800"></span>
				</div>
			</Card>
		</>
	);
}

export default Step3;
