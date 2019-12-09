import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { TextInputField, Button, Pane, SelectMenu } from 'evergreen-ui'
import { defaultGrades } from '@/grades'

import Layout from '@/Layout'
import { createSesh } from '@/storage'

export default function NewSess() {
  const [gymName, setGymName] = React.useState('')
  const [gradeSystem, setGradeSystem] = React.useState()

  const doChangeGymName = e => setGymName(e.target.value)

  const doSelectGradeSystem = el => setGradeSystem(el)

  const doCreateSesh = e => {
    if (gradeSystem == null) return

    e.preventDefault()
    createSesh({ gymName, gradeSystemId: gradeSystem.value })
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

        <Pane marginBottom={16} width="100%">
          <SelectMenu
            hasFilter={false}
            title="Grade system"
            options={Object.values(defaultGrades).map(({ name, id }) => ({
              label: name,
              value: id,
            }))}
            onSelect={doSelectGradeSystem}
            selected={gradeSystem != null ? gradeSystem.id : null}>
            <Button>
              {gradeSystem != null
                ? gradeSystem.label
                : 'Select the grade system'}
            </Button>
          </SelectMenu>
        </Pane>

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
