import { niceNumbers } from "@/UI-Functions/prettyNumbers";
import { ShiftType } from "@/models/shift";
import { Label } from "@radix-ui/react-label";

function PopoverWageInfo({ shift }: { shift: ShiftType }) {
	return (
		<div className="w-full flex p-1">
			<div className="flex flex-col w-full">
				<div className="flex justify-between w-full">
					<Label>Basic: </Label>
					<span>{niceNumbers(Number(shift.wageBreakdown?.totalNormalRatePay))}₪</span>
				</div>

				<div className="flex justify-between">
					<Label>Overtime 125%: </Label>
					<span>{niceNumbers(Number(shift.wageBreakdown?.totalOvertime125Pay))}₪</span>
				</div>
				<div className="flex justify-between">
					<Label>Overtime 150%: </Label>
					<span>{niceNumbers(Number(shift.wageBreakdown?.totalOvertime150Pay))}₪</span>
				</div>

				<div className="flex justify-between w-full">
					<Label>Total: </Label>
					<span className="font-semibold">
						{niceNumbers(Number(shift.wageBreakdown?.totalPay))}₪
					</span>
				</div>
			</div>
		</div>
	);
}

export default PopoverWageInfo;
