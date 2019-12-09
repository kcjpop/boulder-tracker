import store from 'store2'
import differenceInMinutes from 'date-fns/differenceInMinutes'

const SESSIONS = 'BT_SESSIONS'
const CURRENT_SESH = 'BT_CURRENT_SESH'

export function createSesh({ gymName, gradeSystemId }) {
  const old = store(SESSIONS)
  const startedAt = new Date()
  const id = startedAt.toISOString()

  store(SESSIONS, {
    ...old,
    [id]: { id, gymName, gradeSystemId, startedAt, counts: {} },
  })
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

  const endedAt = new Date()

  updateSesh({
    ...curr,
    endedAt,
    duration: differenceInMinutes(new Date(curr.startedAt), endedAt),
  })
  store(CURRENT_SESH, null)
}

export function inc(grade) {
  const curr = getCurrentSesh()
  if (curr == null) throw new Error('No current sesh found')

  const counts = {
    ...curr.counts,
    [grade]: curr.counts[grade] != null ? curr.counts[grade] + 1 : 1,
  }

  updateSesh({ ...curr, counts })
}

export function dec(grade) {
  const curr = getCurrentSesh()
  if (curr == null) throw new Error('No current sesh found')

  const counts = {
    ...curr.counts,
    [grade]:
      curr.counts[grade] != null && curr.counts[grade] - 1 >= 0
        ? curr.counts[grade] - 1
        : curr.counts[grade],
  }

  updateSesh({ ...curr, counts })
}

export function getAll() {
  return store(SESSIONS)
}

export function flush() {
  store(false)
}
