import { niceDate } from '@/UI-Functions/prettyDate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShiftType } from '@/models/shift';
import './charts.scss';
const OverviewGraph = ({ shifts }: {shifts: ShiftType[]}) => {
  const data = shifts.map((shift: ShiftType) => ({
    date: shift.shiftDate,
    totalWage: shift.wage,
  }));

  // Sort the data by totalWage in descending order
  data.sort((a, b) => b.totalWage - a.totalWage)

  return (
    <Card className='w-1/2 mx-2 p-8 pb-1 min-h-[350px]'>
    <CardHeader className='p-2 mb-4'>
      <CardTitle>
        Five last shifts
      </CardTitle>
    </CardHeader>
      <CardContent className='pb-0'>
       <div className="bar-chart flex justify-start items-end">
        {shifts.slice(0,5).map((shift: ShiftType, index: number) => (
        <>
          <div
            key={index}
            className="bar bg-primary p-1"
            style={{ height: (shift.wage / 2.5) }}
          >
          <span className='text-center text-xs'>{niceDate(shift.shiftDate)}</span>
             <span className='font-semibold text-pretty'>{Math.round(shift.wage)}₪</span>
          </div>
        </>
        ))}
      </div>
      </CardContent>
    
    </Card>
  );
};

export default OverviewGraph;


