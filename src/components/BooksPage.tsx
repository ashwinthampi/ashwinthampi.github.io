import BackButton from './BackButton'
import booksData from '../data/books.json'

interface Props {
  onBack: () => void
}

const wantingToRead = [
  'Solaris — Stanisław Lem',
  'Ubik — Philip K. Dick',
  'A Scanner Darkly — Philip K. Dick',
]

const legacyYears: Record<string, string[]> = {
  '2025': [
    'The Three-Body Problem — Cixin Liu',
    'The Stranger — Albert Camus',
    'The Myth of Sisyphus — Albert Camus',
    'Dune — Frank Herbert',
    'The Creative Act: A Way of Being — Rick Rubin',
  ],
}

const syncedYears = booksData.years as Record<string, string[]>
const mergedYears: Record<string, string[]> = { ...legacyYears, ...syncedYears }

const sections: { title: string; items: string[] }[] = [
  { title: 'currently reading', items: booksData.currentlyReading },
  { title: 'wanting to read', items: wantingToRead },
  ...Object.keys(mergedYears)
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => ({
      title: year,
      items: mergedYears[year],
    })),
]

export default function BooksPage({ onBack }: Props) {
  return (
    <>
      <BackButton onBack={onBack} />
      <h1 className="text-2xl sm:text-3xl font-bold text-[#111] mb-3">
        books
      </h1>
      <p className="text-xs text-[#555] mb-12">
        "With freedom, flowers, books, and the moon, who could not be perfectly happy?"
        <span className="block">Oscar Wilde</span>
      </p>
      {sections.map((section) => (
        <section key={section.title} className="mb-12">
          <h2 className="text-xs tracking-widest text-[#555] mb-3">
            {section.title}
          </h2>
          {section.items.length === 0 ? (
            <p className="text-sm italic text-[#999]">coming soon</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {section.items.map((item) => (
                <li key={item} className="text-sm text-[#111]">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <p className="text-sm text-[#555]">
        full list on{' '}
        <a
          href="https://www.goodreads.com/user/show/198396455-ashwin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#111] underline underline-offset-2 decoration-[#555]/30 hover:decoration-[#111] transition-colors"
        >
          goodreads
        </a>
      </p>
    </>
  )
}
