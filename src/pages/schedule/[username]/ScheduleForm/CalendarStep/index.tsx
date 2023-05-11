import { Calendar } from '@/components/Calendar'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const isDateSelected = true

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            thursday <span>may 11th</span>
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
