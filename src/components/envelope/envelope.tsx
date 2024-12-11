// app/components/envelop.tsx
'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import EnvelopeLetter from "@/components/envelope/envelope-letter";
import EnvelopeBase from "@/components/envelope/envelope-base";
import EnvelopeLid from "@/components/envelope/envelope-lid";

interface EnvelopeProps {
    writer: string;
    messages: {
        target: string;
        writer: string;
        text: string;
    }[];
    target: string;
    isOpenEnvelope: boolean;
    setOpenWriter: Dispatch<SetStateAction<string | null>>;
    color: string;
}

export default function Envelope({ writer, messages, target, isOpenEnvelope, setOpenWriter, color }: EnvelopeProps) {
    const audioLidRef = useRef<HTMLAudioElement | null>(null);
    const audioLetterRef = useRef<HTMLAudioElement | null>(null);
    const [lidStatus, setLidStatus] = useState<'open' | 'close'>('close');
    const [letterStatus, setLetterStatus] = useState<'inside' | 'outside'>('inside');

    const [envelopeStyle, setEnvelopeStyle] = useState(''); // スケールクラス

    // 蓋が開いた瞬間にスケール変更
    useEffect(() => {
        if (isOpenEnvelope && lidStatus === 'open') {
            setEnvelopeStyle('scale-125 translate-y-10 duration-500 shadow-envelope-hover-scale');
        }
    }, [isOpenEnvelope, lidStatus]);

    const currentMessage = messages.find((message) => message.target === target && message.writer === writer);
    if (!currentMessage) return null;
    
    const handleToggleEnvelope = (writer: string) => {
        if (!isOpenEnvelope) {
            playSound('lid');
        }

        if (isOpenEnvelope) {
            playSound('letter');
        }
        setOpenWriter((prevWriter) => (prevWriter === writer ? null : writer));
    };

    const playSound = (speaker: 'lid' | 'letter') => {
        if (speaker === 'lid' && audioLidRef.current) {
            audioLidRef.current.currentTime = 0; // 再生位置をリセット
            audioLidRef.current.play();
        }

        if (speaker === 'letter' && audioLetterRef.current) {
            audioLetterRef.current.currentTime = 0; // 再生位置をリセット
            audioLetterRef.current.play();
        }
    }

    return (
        <div
            className={`relative w-[212px] h-[122px] z-10 cursor-pointer transition hover:duration-200 shadow-envelope hover:shadow-envelope-hover-scale bg-[#bababa] ${envelopeStyle}`}
            onClick={() => handleToggleEnvelope(writer)}
        >
            <audio ref={audioLidRef} src="/audio/lid.mp3" />
            <audio ref={audioLetterRef} src="/audio/letter.mp3" />
            <EnvelopeBase color={color} />
            <EnvelopeLid color={color} isOpenEnvelope={isOpenEnvelope} lidStatus={lidStatus} setLidStatus={setLidStatus} letterStatus={letterStatus} playSound={playSound} />
            <EnvelopeLetter isOpenEnvelope={isOpenEnvelope} lidStatus={lidStatus} currentMessage={currentMessage} playSound={playSound} letterStatus={letterStatus} setLetterStatus={setLetterStatus} envelopeStyle={envelopeStyle} setEnvelopeStyle={setEnvelopeStyle} />
        </div>
    );
}
