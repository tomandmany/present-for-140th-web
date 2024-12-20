import EnvelopeContext from "@/components/envelope/envelope-context";
import getMessages from "@/data/get-messages";
import { Rewind } from "lucide-react";
import Link from "next/link";



export default function Page() {
  const messages = getMessages();

  return (
    <main className="flex justify-center items-center min-w-full min-h-[100svh] relative z-target-page">
      <EnvelopeContext messages={messages} />
      <Link href={'/'} className="fixed left-6 bottom-6 border-4 border-white bg-[#FCC0DC] rounded-full p-3 hover:scale-110 z-back-button transition shadow-back-button hover:shadow-back-button-hover">
        <Rewind size={32} className="text-white relative -left-[2px]" />
      </Link>
    </main>
  )
}