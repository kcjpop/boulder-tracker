import React from 'react'
import Layout from '@/Layout'
import CurrentSesh from '@/CurrentSesh'
import EmptySesh from '@/EmptySesh'
import { getCurrentSesh, inc, dec } from '@/storage'

function Index() {
  const [currentSesh, setCurrentSesh] = React.useState(getCurrentSesh())

  const onInc = grade => e => {
    e.preventDefault()
    inc(grade)
    setCurrentSesh(getCurrentSesh())
  }

  const onDec = grade => e => {
    e.preventDefault()
    dec(grade)
    setCurrentSesh(getCurrentSesh())
  }

  return (
    <Layout>
      {currentSesh != null ? (
        <CurrentSesh sesh={currentSesh} onInc={onInc} onDec={onDec} />
      ) : (
        <EmptySesh />
      )}
    </Layout>
  )
}

export default Index
