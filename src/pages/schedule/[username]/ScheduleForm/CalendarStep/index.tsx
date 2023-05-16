import { useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { api } from '@/lib/axios'
import { Calendar } from '@/components/Calendar'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useQuery } from '@tanstack/react-query'

interface Availability {
  possibleTimes: Array<number>
  availableTimes: Array<number>
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const month = selectedDate ? dayjs(selectedDate).format('MMM') : null
  const day = selectedDate ? dayjs(selectedDate).format('Do') : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

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
            {availability &&
              availability.possibleTimes.length > 0 &&
              availability.possibleTimes.map((hour) => (
                <TimePickerItem
                  disabled={!availability.availableTimes.includes(hour)}
                  key={hour}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
