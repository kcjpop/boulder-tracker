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
import {
  Icon,
  Pane,
  Button,
  Text,
  Paragraph,
  IconButton,
  Heading,
} from 'evergreen-ui'
import Router from 'next/router'
import differenceInMinutes from 'date-fns/differenceInMinutes'

import { endCurrentSesh } from '@/storage'
import { getGradeCounters, getGradeFromId } from '@/grades'

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
    <Pane display="flex" flexDirection="column">
      <Pane
        marginBottom={16}
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Heading size={600}>Current Sesh</Heading>
        <Button
          height={48}
          justifyContent="center"
          appearance="primary"
          onClick={doEndSesh}>
          End Sesh
        </Button>
      </Pane>

      <Pane>
        <Pane display="flex" justifyContent="space-between" marginBottom={16}>
          <Paragraph display="flex" alignItems="center">
            <Icon icon="map-marker" marginRight={8} />
            {sesh.gymName}
          </Paragraph>
          <Paragraph display="flex" alignItems="center">
            <Icon icon="time" marginRight={8} />
            {duration} mins
          </Paragraph>
        </Pane>

        <Heading marginBottom={8}>Grades</Heading>

        {counters.map((prob, i) => (
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            key={prob.grade}
            paddingX={16}
            background={i % 2 ? 'tint2' : 'tint'}>
            <Text>{prob.grade}</Text>
            <Pane display="flex" alignItems="center">
              <IconButton
                icon="remove"
                height={40}
                appearance="minimal"
                iconSize={16}
                onClick={onDec(prob.grade)}
              />
              <Text marginX={8}>
                {prob.grade in sesh.counts ? sesh.counts[prob.grade] : 0}
              </Text>
              <IconButton
                icon="add"
                height={40}
                appearance="minimal"
                iconSize={16}
                onClick={onInc(prob.grade)}
              />
            </Pane>
          </Pane>
        ))}
      </Pane>
    </Pane>
  )
}
