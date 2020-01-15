import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { defaultGrades } from '@/grades'

import Layout from '@/Layout'
import Button from '@/Button'
import { createSesh } from '@/storage'

export default function NewSess() {
  const [gymName, setGymName] = React.useState('')
  const [gradeSystem, setGradeSystem] = React.useState('Fontainebleau')

  const doChangeGymName = e => setGymName(e.target.value)

  const doSelectGradeSystem = e => setGradeSystem(e.target.value)

  const doCreateSesh = e => {
    if (gradeSystem == null) return

    e.preventDefault()
    createSesh({ gymName, gradeSystemId: gradeSystem })
    Router.push('/')
  }

  return (
    <Layout>
      <Head>
        <title>Create a new sesh</title>
      </Head>
      <form className="flex flex-col" onSubmit={doCreateSesh}>
        <fieldset className="flex flex-col mb-4">
          <label htmlFor="" className="mb-2 text-sm font-bold">
            Gym Name*
          </label>
          <input
            required
            type="text"
            placeholder="E.g. KiipeilyAreena Kalasatama"
            className="bg-gray-200 p-2 rounded"
            value={gymName}
            onChange={doChangeGymName}
          />
        </fieldset>

        <fieldset className="flex flex-col mb-4">
          <fieldset className="mb-2 text-sm font-bold">Grade System*</fieldset>
          {Object.values(defaultGrades).map(({ name, id }) => (
            <label className="mb-2" key={name}>
              <input
                key={name}
                type="radio"
                name="grade"
                value={id}
                className="mr-2"
                checked={gradeSystem != null && gradeSystem === id}
                onChange={doSelectGradeSystem}
              />
              {name}
            </label>
          ))}
        </fieldset>

        <Button>Start training</Button>
      </form>
    </Layout>
  )
}
