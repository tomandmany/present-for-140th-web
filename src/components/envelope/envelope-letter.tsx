'use client'

import { Dispatch, SetStateAction, useEffect } from "react";

interface EnvelopeLetterProps {
    isOpenEnvelope: boolean;
    lidStatus: 'open' | 'close';
    currentMessage: {
        target: string;
        writer: string;
        text: string;
    };
    playSound: (speaker: 'lid' | 'letter') => void;
    letterStatus: string;
    setLetterStatus: Dispatch<SetStateAction<'outside' | 'inside'>>;
    setEnvelopeStyle: Dispatch<SetStateAction<string>>;
}

export default function EnvelopeLetter({ isOpenEnvelope, lidStatus, currentMessage, playSound, letterStatus, setLetterStatus, setEnvelopeStyle }: EnvelopeLetterProps) {
    // 手紙が inside になった瞬間にスケール変更
    useEffect(() => {
        if (!isOpenEnvelope && letterStatus === 'inside') {
            setEnvelopeStyle('');
        }
    }, [isOpenEnvelope, letterStatus]);

    const handleLetterStatus = () => {
        if (isOpenEnvelope) {
            setLetterStatus("outside");
        }

        if (!isOpenEnvelope) {
            setLetterStatus("inside");
            playSound('lid');
        }
    }

    return (
        <div
            className={`z-20 absolute top-0 left-1/2 w-[80%] bg-gray-50 origin-bottom transition-[height,opacity,transform,box-shadow] duration-150 
                ${isOpenEnvelope
                    ? lidStatus === 'open'
                        ? 'h-[230px] pointer-events-auto -translate-y-[240px] shadow'
                        : 'h-0 pointer-events-none'
                    : 'h-0 pointer-events-none'
                } -translate-x-1/2 overflow-hidden`}
            onTransitionEnd={handleLetterStatus}
        >
            <p className="text-black m-4 text-sm">{currentMessage?.text}</p>
        </div>
    )
}