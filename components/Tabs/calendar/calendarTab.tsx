'use client';
import './calendar.scss';
import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarTab() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='w-full h-full p-0'>
      <Calendar onChange={onChange} value={value} calendarType='hebrew' view='month' />
    </div>
  );
}