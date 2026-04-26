const interests = [
  'the frontier of AI agents and intelligence research',
  'software at the seams of creative work and technical systems',
  'embedded software and digital hardware',
]

export default function CareerInterests() {
  return (
    <section className="mb-12">
      <h2 className="text-xs tracking-widest text-[#555] mb-3">
        what excites me
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        {interests.map((item) => (
          <li key={item} className="text-sm text-[#111]">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
