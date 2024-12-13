interface EnvelopeBaseProps {
  color: string;
}

const colorMap: Record<string, string> = {
  blue: 'bg-[#CBF1FF]',
  pink: 'bg-[#FFCCEE]',
  green: 'bg-[#D6F8CA]',
  yellow: 'bg-[#FFF1B7]',
}

export default function EnvelopeBase({ color }: EnvelopeBaseProps) {
  return (
    <div className={`${colorMap[color]} absolute left-0 top-0 w-full h-full border border-black z-envelope-base`} />
  )
}