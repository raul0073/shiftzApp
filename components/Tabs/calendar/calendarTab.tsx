'use client';
import React from 'react';
import type { Dayjs } from 'dayjs';
import { Calendar, Badge } from 'antd';
import {  CalendarProps } from 'antd/es/calendar';
import { ShiftType } from '@/models/shift';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';



const getListData = (value: Dayjs, shifts: ShiftType[]): ShiftType[] => {
  const date = value.format('YYYY-MM-DD');
  const shiftsOnDate = shifts.filter((shift) => shift.shiftDate.toString() === date);
  return shiftsOnDate;
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const App: React.FC = () => {
  const shifts = useSelector((state: RootState) => state.shifts.shifts);

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const shiftsOnDate = getListData(value, shifts);

    return (
      <div>
        <ul className="events">
          {shiftsOnDate.map((shift: ShiftType, index: number) => (
            <li key={index}>
              {shift.wage}
            </li>
          ))}
        </ul>
        {shiftsOnDate.length > 0 && <Calendar />}
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default App;
