'use client'
import { usePathname } from "next/navigation";
import Envelope from "./envelope";
import { useState } from "react";

interface EnvelopeContextProps {
    messages: {
        target: string;
        writer: string;
        text: string;
    }[];
}

const targetMap: Record<string, string> = {
    'sho': 'しょう',
    'iroha': 'いろは',
    'miyuu': 'みゆう',
    'yudai': 'ゆうだい',
}

const writers = ['maho', 'rin', 'oni', 'shoya'];

export default function EnvelopeContext({ messages }: EnvelopeContextProps) {
    const [openWriter, setOpenWriter] = useState<string | null>(null);

    const pathname = usePathname();
    if (!pathname) return null;
    const target = pathname.slice(1);

    return (
        <div className="flex flex-col items-center gap-10">
            <h1 className="text-5xl w-fit">{targetMap[target]}へ</h1>
            {writers.map((writer, index) => (
                <Envelope
                    key={index}
                    writer={writer}
                    target={target}
                    messages={messages}
                    isOpenEnvelope={openWriter === writer}
                    setOpenWriter={setOpenWriter}
                    color={index % 2 === 0 ? 'pink' : 'blue'}
                />
            ))}
        </div>
    )
}