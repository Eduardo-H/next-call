import { useState } from 'react'
import { Calendar } from '@/components/Calendar'

import dayjs from 'dayjs'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('ddd') : null
  const month = selectedDate ? dayjs(selectedDate).format('MMM') : null
  const day = selectedDate ? dayjs(selectedDate).format('Do') : null

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}{' '}
            <span>
              {month} {day}
            </span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>8AM</TimePickerItem>
            <TimePickerItem>9AM</TimePickerItem>
            <TimePickerItem>10AM</TimePickerItem>
            <TimePickerItem>11AM</TimePickerItem>
            <TimePickerItem>12PM</TimePickerItem>
            <TimePickerItem>1PM</TimePickerItem>
            <TimePickerItem>2PM</TimePickerItem>
            <TimePickerItem>3PM</TimePickerItem>
            <TimePickerItem>4PM</TimePickerItem>
            <TimePickerItem>5PM</TimePickerItem>
            <TimePickerItem>6PM</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
