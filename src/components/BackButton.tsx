interface Props {
  onBack: () => void
}

export default function BackButton({ onBack }: Props) {
  return (
    <button
      onClick={onBack}
      className="text-xs text-[#555] hover:text-[#111] transition-colors mb-8 cursor-pointer"
    >
      &larr; back
    </button>
  )
}
