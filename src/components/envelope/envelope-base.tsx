interface EnvelopeBaseProps {
  color: string;
}

const colorMap: Record<string, string> = {
  pink: 'bg-[#FCC3C2]',
  blue: 'bg-[#C2DDFC]',
}

export default function EnvelopeBase({color}: EnvelopeBaseProps) {
  return (
    <div className={`${colorMap[color]} absolute left-0 top-0 w-full h-full border border-black z-10`} />
  )
}