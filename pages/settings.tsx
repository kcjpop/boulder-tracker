import Head from 'next/head'
import { Button, Pane } from 'evergreen-ui'

import Layout from '@/Layout'
import { flush } from '@/storage'

export default function Settings() {
  const doClearAll = e => {
    e.preventDefault()
    flush()
  }

  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
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
