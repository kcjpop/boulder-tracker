import { TextInputField, Button, Pane } from 'evergreen-ui'

import Layout from '@/Layout'
import { flush } from '@/storage'

export default function Settings() {
  const doClearAll = e => {
    e.preventDefault()
    flush()
  }

  return (
    <Layout>
      <Pane display="flex" flexDirection="column">
        <Button
          height={48}
          justifyContent="center"
          intent="danger"
          appearance="primary"
          onClick={doClearAll}>
          Clear All
        </Button>
      </Pane>
    </Layout>
  )
}
