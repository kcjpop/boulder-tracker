import { Pane, Button, Paragraph } from 'evergreen-ui'
import Link from 'next/link'

export default function EmptySesh() {
  return (
    <Pane display="flex" flexDirection="column">
      <Paragraph marginBottom={8} color="muted">
        No active sesh. Create a new one?
      </Paragraph>
      <Link href="/new">
        <Button height={48} justifyContent="center" appearance="primary">
          New Sesh
        </Button>
      </Link>
    </Pane>
  )
}
