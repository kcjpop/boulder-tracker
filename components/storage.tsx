import store from 'store2'

const SESSIONS = 'BT_SESSIONS'
const CURRENT_SESH = 'BT_CURRENT_SESH'

export function createSesh({ gymName }) {
  const old = store(SESSIONS)
  const startedAt = new Date()
  const id = startedAt.toISOString()

  store(SESSIONS, { ...old, [id]: { id, gymName, startedAt, problems: [] } })
  store(CURRENT_SESH, id)
}

export function getCurrentSesh() {
  const id = store(CURRENT_SESH)
  const all = store(SESSIONS)

  return id != null && id in all ? all[id] : null
}

export function endCurrentSesh() {
  const id = store(CURRENT_SESH)
  if (!id) throw new Error('No current sesh found')

  const all = store(SESSIONS)
  const curr = all[id]

  store(SESSIONS, {
    ...all,
    [id]: { ...curr, endedAt: new Date() },
  })
  store(CURRENT_SESH, null)
}

export function flush() {
  store(false)
}
