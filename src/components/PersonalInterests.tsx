import { Link } from 'react-router-dom'

const items: { label: string; to: string }[] = [
  { label: 'favorite music', to: '/music' },
  { label: 'books', to: '/books' },
  { label: 'favorite runway shows', to: '/runway' },
]

export default function PersonalInterests() {
  return (
    <section className="mb-12">
      <h2 className="text-xs tracking-widest text-[#555] mb-3">
        beyond my work
      </h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.to} className="text-sm text-[#111]">
            <span className="text-[#555] mr-2">-&gt;</span>
            <Link
              to={item.to}
              className="text-left underline underline-offset-2 decoration-[#555]/30 hover:decoration-[#111] transition-colors cursor-pointer"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
