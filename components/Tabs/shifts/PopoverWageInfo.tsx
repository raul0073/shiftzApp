import { ShiftType } from "@/models/shift";
import { Label } from "@radix-ui/react-label";

function PopoverWageInfo({ shift }: { shift: ShiftType }) {
	return (
		<div className="w-full flex p-1">
			<div className="flex flex-col w-full">
				<div className="flex justify-between w-full">
					<Label>Basic: </Label>
					<span>{shift.wageBreakdown?.totalNormalRatePay}₪</span>
				</div>

				<div className="flex justify-between">
					<Label>Overtime 125%: </Label>
					<span>{shift.wageBreakdown?.totalOvertime125Pay}₪</span>
				</div>
				<div className="flex justify-between">
					<Label>Overtime 150%: </Label>
					<span>{shift.wageBreakdown?.totalOvertime150Pay}₪</span>
				</div>

				<div className="flex justify-between w-full">
					<Label>Total: </Label>
					<span className="font-semibold">
						{shift.wageBreakdown?.totalPay}₪
					</span>
				</div>
			</div>
		</div>
	);
}

export default PopoverWageInfo;
