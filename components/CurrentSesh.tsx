interface Sesh {
  gymName: string
}

interface CurrentSeshProps {
  sesh: Sesh
}

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

import { endCurrentSesh } from '@/storage'

const SCALES = [
  '4',
  '4+',
  '5',
  '5+',
  '6A',
  '6A+',
  '6B',
  '6B+',
  '6C',
  '6C+',
  '7A',
  '7A+',
  '7B',
  '7B+',
  '7C',
  '7C+',
  '8A',
]

export default function CurrentSesh({ sesh }: CurrentSeshProps) {
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
        <Pane display="flex" justifyContent="space-between" marginBottom={8}>
          <Paragraph display="flex" alignItems="center">
            <Icon icon="map-marker" marginRight={8} />
            {sesh.gymName}
          </Paragraph>
          <Paragraph display="flex" alignItems="center">
            <Icon icon="time" marginRight={8} />
            20 mins
          </Paragraph>
        </Pane>

        <Heading marginBottom={8}>Grades</Heading>

        {SCALES.map((scale, i) => (
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            key={scale}
            paddingX={16}
            background={i % 2 ? 'tint2' : 'tint'}>
            <Text>{scale}</Text>
            <Pane display="flex" alignItems="center">
              <IconButton
                icon="remove"
                height={40}
                appearance="minimal"
                iconSize={16}
              />
              <Text marginX={8}>0</Text>
              <IconButton
                icon="add"
                height={40}
                appearance="minimal"
                iconSize={16}
              />
            </Pane>
          </Pane>
        ))}
      </Pane>
    </Pane>
  )
}
