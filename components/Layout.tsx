import '../styles.css'
import { Pane } from 'evergreen-ui'
import Nav from './Nav'

export default function Layout({ children }) {
  return (
    <Pane>
      <Nav />
      {children}
    </Pane>
  )
}
