interface Sesh {
  gymName: string
  gradeSystemId: string
  counts: {
    grade: string
    count: number
  }[]
  startedAt: Date
  endedAt: Date
  duration: number
}

interface CurrentSeshProps {
  sesh: Sesh
  onInc: Function
  onDec: Function
}

import React from 'react'
import { Icon, Pane, Text, Paragraph, IconButton, Heading } from 'evergreen-ui'
import Router from 'next/router'
import differenceInMinutes from 'date-fns/differenceInMinutes'

import { endCurrentSesh } from '@/storage'
import { getGradeCounters, getGradeFromId } from '@/grades'
import Button from '@/Button'

function calculateDuration({ startedAt }) {
  return differenceInMinutes(new Date(), new Date(startedAt))
}

export default function CurrentSesh({ sesh, onInc, onDec }: CurrentSeshProps) {
  const intervalId = React.useRef<ReturnType<typeof setInterval>>()
  const [duration, setDuration] = React.useState(calculateDuration(sesh))

  React.useEffect(() => {
    intervalId.current = setInterval(() => {
      setDuration(calculateDuration(sesh))
    }, 60000)

    return () => clearInterval(intervalId.current)
  })

  const doEndSesh = e => {
    e.preventDefault()
    endCurrentSesh()
    Router.push('/stats')
  }

  const gradeSystem = getGradeFromId(sesh.gradeSystemId)
  const counters = getGradeCounters(gradeSystem)

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Current Sesh</h2>
        <Button onClick={doEndSesh}>End Sesh</Button>
      </div>

      <div>
        <div className="flex items-center mb-4">
          <p className="flex items-center mr-2">
            <i className="fad fa-home fa-lg mr-2"></i>
            {sesh.gymName}
          </p>
          <p className="flex items-center">
            <i className="fad fa-alarm-clock fa-lg mr-2"></i>
            {duration} mins
          </p>
        </div>

        <h2 className="text-xl">Grades</h2>

        {counters.map((prob, i) => (
          <p
            key={prob.grade}
            className={`flex items-center ${
              i % 2 ? 'bg-gray-200' : ''
            } py-2 px-4`}>
            <p>{prob.grade}</p>
            <div className="ml-auto flex">
              <button onClick={onDec(prob.grade)}>
                <i className="far fa-minus-circle fa-lg"></i>
              </button>
              <p className="bg-pink-500 text-pink-100 mx-2 rounded w-8 h-8 flex items-center justify-center">
                {prob.grade in sesh.counts ? sesh.counts[prob.grade] : 0}
              </p>
              <button onClick={onInc(prob.grade)}>
                <i className="far fa-plus-circle fa-lg"></i>
              </button>
            </div>
          </p>
        ))}
      </div>
    </div>
  )
}
