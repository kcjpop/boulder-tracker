import '../styles.css'
import Nav from './Nav'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div className="container mx-auto text-gray-700 font-sans">
      <Head>
        <script src="https://kit.fontawesome.com/43d24f401c.js"></script>
      </Head>
      <Nav />
      <div className="p-4">{children}</div>
    </div>
  )
}
