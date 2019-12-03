import Layout from '@/Layout'
import CurrentSesh from '@/CurrentSesh'
import EmptySesh from '@/EmptySesh'
import { getCurrentSesh } from '@/storage'

function Index() {
  const currentSesh = getCurrentSesh()

  return (
    <Layout>
      {currentSesh != null ? <CurrentSesh sesh={currentSesh} /> : <EmptySesh />}
    </Layout>
  )
}

export default Index
