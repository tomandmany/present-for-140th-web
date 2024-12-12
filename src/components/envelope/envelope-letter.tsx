'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface EnvelopeLetterProps {
    isOpenEnvelope: boolean;
    lidStatus: 'open' | 'close';
    currentMessage: {
        target: string;
        writer: string;
        text: string;
    };
    playSound: (speaker: 'lid' | 'letter') => void;
    envelopeStyle: string;
    letterStatus: 'inside' | 'up' | 'center';
    setLetterStatus: Dispatch<SetStateAction<'inside' | 'up' | 'center'>>;
    setEnvelopeStyle: Dispatch<SetStateAction<string>>;
    writer: string;
    handleToggleEnvelope: (writer: string) => void;
}

export default function EnvelopeLetter({
    isOpenEnvelope,
    lidStatus,
    currentMessage,
    writer,
    handleToggleEnvelope,
    letterStatus,
    setLetterStatus,
}: EnvelopeLetterProps) {
    // const [animationState, setAnimationState] = useState<'inside' | 'up' | 'center'>('inside');

    // 状態ごとのスタイルを定義
    const animationStyles: Record<typeof letterStatus, string> = {
        inside: 'h-0 pointer-events-none',
        up: `-translate-y-[100vh]`,
        center: 'translate-y-[330px] scale-150 z-letter-dialog',
    };

    // アニメーション開始のトリガー
    useEffect(() => {
        if (isOpenEnvelope && lidStatus === 'open') {
            setLetterStatus('up');
        } else if (!isOpenEnvelope) {
            setLetterStatus('inside');
        }
    }, [isOpenEnvelope, lidStatus]);

    const handleAnimationEnd = () => {
        if (letterStatus === 'up') {
            setLetterStatus('center');
        }
    };

    return (
        <>
            {letterStatus !== 'center' && (
                <div
                    className={`absolute top-0 left-1/2 w-[80%] bg-gray-50 origin-bottom transition-[height,transform,box-shadow] duration-1000 -translate-x-1/2 overflow-hidden z-envelope-letter ${animationStyles[letterStatus]}`}
                    onTransitionEnd={handleAnimationEnd}
                >
                    <p className="text-black m-4 text-sm">{currentMessage?.text}</p>
                </div>
            )}
            {letterStatus === 'center' && (
                createPortal(
                    <>
                        <div
                            className="fixed inset-0 bg-zinc-900/80 z-letter-dialog-bg"
                            onClick={() => handleToggleEnvelope(writer)}
                        />,
                        <div
                            className={`absolute top-0 left-1/2 w-[200px] h-[300px] bg-gray-50 origin-bottom transition-[height,transform,box-shadow] duration-1000 -translate-x-1/2 overflow-hidden ${animationStyles[letterStatus]}`}
                            onTransitionEnd={handleAnimationEnd}
                        >
                            <p className="text-black m-4 text-sm">{currentMessage?.text}</p>
                        </div>
                    </>,
                    document.body
                )
            )}
        </>
    );
}
