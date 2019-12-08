import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { TextInputField, Button, Pane } from 'evergreen-ui'

import Layout from '@/Layout'
import { createSesh } from '@/storage'

export default function NewSess() {
  const [gymName, setGymName] = React.useState('')

  const doChangeGymName = e => setGymName(e.target.value)

  const doCreateSesh = e => {
    e.preventDefault()
    createSesh({ gymName })
    Router.push('/')
  }

  return (
    <Layout>
      <Head>
        <title>Create a new sesh</title>
      </Head>
      <Pane
        is="form"
        display="flex"
        flexDirection="column"
        onSubmit={doCreateSesh}>
        <TextInputField
          required
          value={gymName}
          label="Gym name"
          marginBottom={16}
          placeholder="E.g. KiipeilyAreena Kalasatama"
          onChange={doChangeGymName}
        />

        <Button
          type="submit"
          height={48}
          justifyContent="center"
          appearance="primary">
          Start training
        </Button>
      </Pane>
    </Layout>
  )
}
