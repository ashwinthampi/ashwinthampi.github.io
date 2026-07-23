import { Link } from 'react-router-dom'

type Item =
  | { label: string; to: string }
  | { label: string; href: string; hint?: string }

const items: Item[] = [
  { label: 'favorite music', to: '/music' },
  { label: 'books', to: '/books' },
  { label: 'favorite runway shows', to: '/runway' },
  {
    label: 'mizuki',
    href: 'https://mizuki.design',
    hint: 'my fashion editorial, in time a brand',
  },
]

const linkClass =
  'text-left underline underline-offset-2 decoration-[#555]/30 hover:decoration-[#111] transition-colors cursor-pointer'

export default function PersonalInterests() {
  return (
    <section className="mb-12">
      <h2 className="text-xs tracking-widest text-[#555] mb-3">
        beyond my work
      </h2>
      <ul className="space-y-1">
        {items.map((item) => {
          const key = 'to' in item ? item.to : item.href
          const hasHint = 'hint' in item && item.hint
          return (
            <li
              key={key}
              className={`text-sm text-[#111] ${
                hasHint ? 'flex flex-wrap items-center group' : ''
              }`}
            >
              <span className="text-[#555] mr-2">-&gt;</span>
              {'to' in item ? (
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {item.label}
                </a>
              )}
              {hasHint && (
                <span className="desktop-hint text-xs text-[#555] ml-2 transition-opacity duration-200">
                  &larr; {item.hint}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
