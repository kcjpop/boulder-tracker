import Link from 'next/link'

const NAV: { icon: string; text: string; href: string }[] = [
  { icon: 'fad fa-dumbbell', text: 'Current Sesh', href: '/' },
  { icon: 'fad fa-analytics', text: 'Stats', href: '/stats' },
  { icon: 'fad fa-cogs', text: 'Settings', href: '/settings' },
]
export default function Nav() {
  return (
    <div className="flex mb-4 w-full">
      {NAV.map(nav => (
        <div className="w-1/3" key={nav.text}>
          <Link href={nav.href}>
            <div className="cursor-pointer bg-indigo-600 text-indigo-100 flex flex-col items-center m-2 p-2 rounded">
              <i className={`${nav.icon} fa-2x mb-2`} />
              <p className="text-xs">{nav.text}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
