import React from 'react'
import { Card, CardContent, CardHeader } from '../../ui/card'
import { ShiftType } from '@/models/shift'
import { niceDate } from '@/UI-Functions/prettyDate'


function UpComingShifts({shifts}:{shifts: ShiftType[]}) {

  const filteredShifts = shifts.filter((shift: ShiftType) => {
    return new Date(shift.shiftDate) > new Date()
  })
  
  return (
        <Card className='w-full mx-2 p-8 min-h-[350px]'>
        <CardHeader>Coming Shifts</CardHeader>
        <CardContent>
           {filteredShifts.map((shift: ShiftType, index: number)=> {
            return (
              <div key={index}
              className='border-primary border-b-[.1rem]'
              >{niceDate(shift.shiftDate)}</div>
            )
           })}
        </CardContent>
    </Card>
  )
}

export default UpComingShifts