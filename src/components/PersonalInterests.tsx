import type { Page } from '../types'

const items: { label: string; page: Page }[] = [
  { label: 'favorite music', page: 'music' },
  { label: 'books', page: 'books' },
  { label: 'favorite runway shows', page: 'runway' },
]

interface Props {
  onNavigate: (page: Page) => void
}

export default function PersonalInterests({ onNavigate }: Props) {
  return (
    <section className="mb-12">
      <h2 className="text-xs tracking-widest text-[#555] mb-3">
        beyond my work
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item) => (
          <li key={item.page} className="text-sm text-[#111]">
            <button
              onClick={() => onNavigate(item.page)}
              className="text-left underline underline-offset-2 decoration-[#555]/30 hover:decoration-[#111] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
