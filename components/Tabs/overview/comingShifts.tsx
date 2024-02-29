import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { ShiftType } from '@/models/shift'
import { niceDate } from '@/UI-Functions/prettyDate'


function UpComingShifts({shifts}:{shifts: ShiftType[]}) {

  const filteredShifts = shifts.filter((shift: ShiftType) => {
    return new Date(shift.shiftDate) > new Date()
  })
  
  return (
		<Card className="w-full h-fit min-h-[230px] mx-2 p-1 pb-1 overflow-hidden">
			<CardHeader className="p-4 mb-4">
				<CardTitle>Coming shifts</CardTitle>
			</CardHeader>
        <CardContent>
          {filteredShifts.length > 0 ? (
           filteredShifts.map((shift: ShiftType, index: number)=> {
            return (
              <div key={index}
              className='border-primary border-b-[.1rem]'
              >{niceDate(shift.shiftDate)}</div>
            )
           })
          ): (
            <p> No coming shifts. </p>
          )}
        </CardContent>
    </Card>
  )
}

export default UpComingShifts