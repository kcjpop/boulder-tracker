import {
  Icon,
  Pane,
  Button,
  Text,
  Paragraph,
  IconName,
  IconButton,
  Heading,
} from 'evergreen-ui'
import Link from 'next/link'

const NAV: { icon: IconName; text: string }[] = [
  { icon: 'crown', text: 'Current Sess' },
  { icon: 'comparison', text: 'Stats' },
  { icon: 'cog', text: 'Settings' },
]

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

function Index() {
  return (
    <Pane>
      <Pane display="flex" width="100%" marginBottom={16}>
        {NAV.map(nav => (
          <Pane paddingX={4} width={`${100 / NAV.length}%`} key={nav.text}>
            <Pane
              background="yellowTint"
              borderRadius={8}
              height={64}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center">
              <Icon icon={nav.icon} color="muted" size={24} marginBottom={8} />
              <Text size={300}>{nav.text}</Text>
            </Pane>
          </Pane>
        ))}
      </Pane>

      <Pane display="flex" flexDirection="column">
        <Pane
          marginBottom={16}
          display="flex"
          alignItems="center"
          justifyContent="space-between">
          <Heading size={600}>Current Sess</Heading>
          <Link href="/new">
            <Button height={48} justifyContent="center" appearance="primary">
              New Sess
            </Button>
          </Link>
        </Pane>

        <Pane>
          <Pane display="flex" justifyContent="space-between" marginBottom={8}>
            <Paragraph display="flex" aignItems="center">
              <Icon icon="map-marker" marginRight={8} />
              KiipeilyAreena Tammisto
            </Paragraph>
            <Paragraph display="flex" aignItems="center">
              <Icon icon="time" marginRight={8} />
              20mins
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
                <Text>0</Text>
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
    </Pane>
  )
}

export default Index
