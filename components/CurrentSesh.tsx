interface Sesh {
  gymName: string
  problems: {
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

import { endCurrentSesh, inc } from '@/storage'

const KIIPEILYAREENA = {
  '1': 'Gray',
  '2': 'Gray',
  '3': 'Gray',
  '4': 'Yellow',
  '4+': 'Yellow',
  '5': 'Green',
  '5+': 'Green',
  '6A': 'Orange',
  '6A+': 'Orange',
  '6B': 'Blue',
  '6B+': 'Blue',
  '6C': 'Red',
  '6C+': 'Red',
  '7A': 'Violet',
  '7A+': 'Violet',
  '7B': 'Pink',
  '7B+': 'Pink',
  '7C': 'Black',
  '7C+': 'Black',
  '8A': 'White',
  '8A+': 'White',
  '8B': 'White',
  '8B+': 'White',
  '8C': 'White',
  '8C+': 'White',
  '9A': 'White',
}

const FONT = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '4+': '4+',
  '5': '5',
  '5+': '5+',
  '6A': '6A',
  '6A+': '6A+',
  '6B': '6B',
  '6B+': '6B+',
  '6C': '6C',
  '6C+': '6C+',
  '7A': '7A',
  '7A+': '7A+',
  '7B': '7B',
  '7B+': '7B+',
  '7C': '7C',
  '7C+': '7C+',
  '8A': '8A',
  '8A+': '8A+',
  '8B': '8B',
  '8B+': '8B+',
  '8C': '8C',
  '8C+': '8C+',
  '9A': '9A',
}

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

        {sesh.problems.map((prob, i) => (
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
              <Text marginX={8}>{prob.count}</Text>
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
