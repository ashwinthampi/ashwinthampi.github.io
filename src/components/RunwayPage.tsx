import BackButton from './BackButton'

interface Props {
  onBack: () => void
}

type Show = string | { title: string; href: string }

const shows: Show[] = [
  {
    title: 'Number (N)ine — A/W 2000 "Redisun"',
    href: 'https://www.youtube.com/watch?v=a7ZKbz0ioqU&t=412s',
  },
  {
    title: 'Number (N)ine — A/W 2001 "Standards"',
    href: 'https://www.youtube.com/watch?v=7IxrKuolccI',
  },
  {
    title: 'Alexander McQueen — Fall/Winter 2009/2010',
    href: 'https://www.youtube.com/watch?v=er20fZrHzUc',
  },
  {
    title: 'Givenchy — Fall/Winter 2022/2023, Paris',
    href: 'https://www.youtube.com/watch?v=NOnVznBldxA',
  },
  {
    title: '1017 ALYX 9SM — Fall/Winter 2022/2023',
    href: 'https://www.youtube.com/watch?v=8prPzm0dhPU',
  },
  {
    title: 'Yohji Yamamoto — Menswear Spring/Summer 2022, Paris',
    href: 'https://www.youtube.com/watch?v=SG6jjAUCzMk&t=845s',
  },
  {
    title: 'A-COLD-WALL* — Spring/Summer 2022',
    href: 'https://www.youtube.com/watch?v=le59feUbS0k',
  },
  {
    title: 'KidSuper — Superby\'s Auction Fashion Show',
    href: 'https://www.youtube.com/watch?v=IRckHSuIJlk',
  },
]

function getKey(show: Show): string {
  return typeof show === 'string' ? show : show.href
}

function renderShow(show: Show) {
  if (typeof show === 'string') {
    return <span className="text-[#111]">{show}</span>
  }
  return (
    <a
      href={show.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#111] underline underline-offset-2 decoration-[#555]/30 hover:decoration-[#111] transition-colors"
    >
      {show.title}
    </a>
  )
}

export default function RunwayPage({ onBack }: Props) {
  return (
    <>
      <BackButton onBack={onBack} />
      <h1 className="text-2xl sm:text-3xl font-bold text-[#111] mb-12">
        favorite runway shows
      </h1>
      {shows.length === 0 ? (
        <p className="text-sm italic text-[#999]">coming soon</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {shows.map((show) => (
            <li key={getKey(show)} className="text-sm">
              {renderShow(show)}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
