import Head from 'next/head'
import { Pane } from 'evergreen-ui'

import Layout from '@/Layout'
import Button from '@/Button'
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
        <Button variant="red" onClick={doClearAll}>
          Clear All
        </Button>
      </Pane>
    </Layout>
  )
}
