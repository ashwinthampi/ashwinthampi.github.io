import BackButton from './BackButton'

interface Props {
  onBack: () => void
}

type Item = string | { title: string; href: string }

const sections: { title: string; items: Item[] }[] = [
  {
    title: 'currently rotating',
    items: [
      'Ken Carson - xperiment',
      'Thom Yorke - The Eraser',
      'Frost Children - Tweaker Poem',
      'Sir John Tavener - Funeral Canticle',
      'Four Tet - Wingdings',
    ],
  },
  {
    title: 'imprint',
    items: [
      'Boards of Canada - Music Has The Right To Children',
      'Skrillex - Scary Monsters and Nice Sprites',
      'Bill Evans - Portrait in Jazz',
      'Chet Baker - Chet',
    ],
  },
  {
    title: 'drift',
    items: [
      'Burial - Untrue',
      'Slowdive - Just for a Day',
      'Nujabes - Modal Soul',
    ],
  },
  {
    title: 'introspective',
    items: [
      'KIDS SEE GHOSTS - KIDS SEE GHOSTS',
      'Drake - Nothing Was The Same',
      'Kendrick Lamar - Good Kid, M.A.A.D City',
    ],
  },
  {
    title: 'kinetic',
    items: [
      'Playboi Carti - Whole Lotta Red',
      'Kanye West - Yeezus',
      'Jack Ü - Jack Ü',
      'Ling Tosite Sigure - Inspiration is DEAD',
      "YOU LOVE HER COZ SHE'S DEAD - YOU LOVE HER COZ SHE'S DEAD",
    ],
  },
  {
    title: 'dj sets',
    items: [
      {
        title: 'Skrillex - Live @ Ultra Music Festival 2015',
        href: 'https://www.youtube.com/watch?v=V2VmcuOEqEg&t=3525s',
      },
      {
        title: 'DJ Heartstring - Boiler Room: Melbourne',
        href: 'https://soundcloud.com/platform/dj-heartstring-melbourne',
      },
      {
        title: 'Skrillex - Live @ Red Rocks Amphitheatre 2014',
        href: 'https://www.youtube.com/watch?v=mMvq44Bvr-w&t=3720s',
      },
      {
        title: 'Soul Mass Transit System - Boiler Room: Leeds',
        href: 'https://soundcloud.com/platform/soul-mass-transit-system-leeds',
      },
      {
        title: 'KlangKuenstler @ Outworld Secret Rave, Berlin',
        href: 'https://soundcloud.com/klangkuenstler/klangkuenstler-outworld-secret-rave-berlin-full-set',
      },
      {
        title: '100 gecs - Boiler Room: Los Angeles',
        href: 'https://soundcloud.com/platform/100-gecs-los-angeles',
      },
      {
        title: 'Fantasm @ Verknipt ArenA, Amsterdam',
        href: 'https://soundcloud.com/verknipt-events/fantasm-verknipt-arena',
      },
      {
        title: 'KETTAMA @ Coachella 2026 - Yuma Stage',
        href: 'https://www.youtube.com/watch?v=t0TZhkzDMAI',
      },
      {
        title: 'Frost Children @ EDC Las Vegas 2026',
        href: 'https://www.youtube.com/watch?v=a8OfrpQLQuY&t=175s',
      },
    ],
  },
]

function getKey(item: Item): string {
  return typeof item === 'string' ? item : item.href
}

function renderItem(item: Item) {
  if (typeof item === 'string') {
    return <span className="text-[#111]">{item}</span>
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#111] underline underline-offset-2 decoration-[#555]/30 hover:decoration-[#111] transition-colors"
    >
      {item.title}
    </a>
  )
}

export default function MusicPage({ onBack }: Props) {
  return (
    <>
      <BackButton onBack={onBack} />
      <h1 className="text-2xl sm:text-3xl font-bold text-[#111] mb-3">
        favorite music
      </h1>
      <p className="text-xs text-[#555] mb-12">
        "Art is how we decorate space, music is how we decorate time."
        <span className="block">Jean-Michel Basquiat</span>
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
                <li key={getKey(item)} className="text-sm">
                  {renderItem(item)}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  )
}
