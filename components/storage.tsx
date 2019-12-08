import store from 'store2'

const SESSIONS = 'BT_SESSIONS'
const CURRENT_SESH = 'BT_CURRENT_SESH'

export function createSesh({ gymName }) {
  const old = store(SESSIONS)
  const startedAt = new Date()
  const id = startedAt.toISOString()

  const problems = [
    '1',
    '2',
    '3',
    '4',
    '4+',
    '5',
    '5+',
    '6A',
    '6A+',
    '6B',
    '6B+',
    '6C',
    '6C+',
    '7A',
    '7A+',
    '7B',
    '7B+',
    '7C',
    '7C+',
    '8A',
    '8A+',
    '8B',
    '8B+',
    '8C',
    '8C+',
    '9A',
  ].map(grade => ({ grade, count: 0 }))

  store(SESSIONS, { ...old, [id]: { id, gymName, startedAt, problems } })
  store(CURRENT_SESH, id)
}

export function getCurrentSesh() {
  const id = store(CURRENT_SESH)
  const all = store(SESSIONS)

  return id != null && id in all ? all[id] : null
}

function updateSesh(sesh) {
  const all = store(SESSIONS)

  store(SESSIONS, {
    ...all,
    [sesh.id]: { ...sesh, endedAt: new Date() },
  })
}

export function endCurrentSesh() {
  const curr = getCurrentSesh()
  if (curr == null) throw new Error('No current sesh found')

  updateSesh({ ...curr, endedAt: new Date() })
  store(CURRENT_SESH, null)
}

export function inc(grade) {
  const curr = getCurrentSesh()
  if (curr == null) throw new Error('No current sesh found')

  const problems = curr.problems.map(prob => {
    if (prob.grade === grade) return { ...prob, count: prob.count + 1 }
    return prob
  })

  updateSesh({ ...curr, problems })
}

export function dec(grade) {
  const curr = getCurrentSesh()
  if (curr == null) throw new Error('No current sesh found')

  const problems = curr.problems.map(prob => {
    if (prob.grade === grade)
      return {
        ...prob,
        count: prob.count - 1 >= 0 ? prob.count - 1 : prob.count,
      }
    return prob
  })

  updateSesh({ ...curr, problems })
}

export function getAll() {
  return store(SESSIONS)
}

export function flush() {
  store(false)
}
