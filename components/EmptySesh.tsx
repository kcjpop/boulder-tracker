import Link from 'next/link'

export default function EmptySesh() {
  return (
    <div>
      <p className="mb-4">No active sesh. Create a new one?</p>
      <Link href="/new">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          New Sesh
        </button>
      </Link>
    </div>
  )
}
