export default function Contact() {
  return (
    <section className="mb-12">
      <h2 className="text-xs tracking-widest text-[#555] mb-3">
        contact
      </h2>
      <ul className="space-y-1">
        <li className="text-sm break-words">
          <span className="text-[#555]">email - </span>
          <a
            href="mailto:ashwin@thampi.com"
            className="text-[#111] underline underline-offset-2 decoration-[#555]/30 hover:decoration-[#111] transition-colors"
          >
            ashwin@thampi.com
          </a>
        </li>
        <li className="text-sm flex flex-wrap items-center gap-x-2 group">
          <a
            href="https://linkedin.com/in/ashwin-thampi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111] underline underline-offset-2 decoration-[#555]/30 hover:decoration-[#111] transition-colors"
          >
            linkedin
          </a>
          <span className="linkedin-hint text-xs text-[#555] transition-opacity duration-200">
            &larr; connect with me here
          </span>
        </li>
        <li className="text-sm">
          <a
            href="https://github.com/ashwinthampi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111] underline underline-offset-2 decoration-[#555]/30 hover:decoration-[#111] transition-colors"
          >
            github
          </a>
        </li>
      </ul>
    </section>
  )
}
