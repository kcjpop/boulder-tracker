import { Icon, Pane, Text, IconName } from 'evergreen-ui'
import Link from 'next/link'

const NAV: { icon: IconName; text: string; href: string }[] = [
  { icon: 'crown', text: 'Current Sesh', href: '/' },
  { icon: 'comparison', text: 'Stats', href: '/stats' },
  { icon: 'cog', text: 'Settings', href: '/settings' },
]
export default function Nav() {
  return (
    <Pane display="flex" width="100%" marginBottom={16}>
      {NAV.map(nav => (
        <Pane paddingX={4} width={`${100 / NAV.length}%`} key={nav.text}>
          <Link href={nav.href}>
            <Pane
              background="yellowTint"
              borderRadius={8}
              height={64}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              cursor="pointer">
              <Icon icon={nav.icon} color="muted" size={24} marginBottom={8} />
              <Text size={300}>{nav.text}</Text>
            </Pane>
          </Link>
        </Pane>
      ))}
    </Pane>
  )
}
