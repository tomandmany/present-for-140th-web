'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSwipeable } from "react-swipeable";

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

type Page = {
    id: number;
    content: string;
};

export default function EnvelopeLetter({
    isOpenEnvelope,
    lidStatus,
    currentMessage,
    writer,
    handleToggleEnvelope,
    letterStatus,
    setLetterStatus,
}: EnvelopeLetterProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const pages: Page[] = [
        { id: 1, content: 'Page 1: Welcome!' },
        { id: 2, content: 'Page 2: Swipe left or right' },
        { id: 3, content: 'Page 3: Another Page!' },
        { id: 4, content: 'Page 4: More Pages!' },
        { id: 5, content: 'Page 5: Even More!' },
    ];
    const len = pages.length;

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            setCurrentIndex((prev) => (prev + 1) % len);
        } else if (direction === 'right') {
            setCurrentIndex((prev) => (prev - 1 + len) % len);
        }
    };

    // マウスでもスワイプ扱いで検知したい場合は trackMouse: true
    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        preventScrollOnSwipe: true,
        trackMouse: true, // ← デスクトップ環境のドラッグ操作もスワイプ扱いで検知
    });

    // 状態ごとのスタイルを定義
    const animationStyles: Record<typeof letterStatus, string> = {
        inside: 'h-0 pointer-events-none',
        up: `-translate-y-[100vh]`,
        center: 'top-1/2 -translate-y-1/2 z-letter-dialog',
    };

    // アニメーション開始のトリガー
    useEffect(() => {
        if (isOpenEnvelope && lidStatus === 'open') {
            setLetterStatus('up');
        } else if (!isOpenEnvelope) {
            setLetterStatus('inside');
        }
    }, [isOpenEnvelope, lidStatus, setLetterStatus]);

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
                            {...handlers}
                            className="fixed inset-0 bg-zinc-900/80 z-letter-dialog-bg"
                            onClick={() => handleToggleEnvelope(writer)}
                        >
                            <span className="fixed bottom-[80px] left-1/2 -translate-x-1/2 text-white text-xl">閉じる</span>
                        </div>
                        {/* <div
                            className={`fixed left-1/2 w-[300px] h-[400px] bg-gray-50 origin-bottom transition-[height,transform,box-shadow] duration-1000 -translate-x-1/2 overflow-hidden ${animationStyles[letterStatus]}`}
                            onTransitionEnd={handleAnimationEnd}
                        >
                            <p className="text-black m-4 text-sm">{currentMessage?.text}</p>
                        </div> */}
                        {pages.map((page, i) => {
                            const distance = (i - currentIndex + len) % len;
                            if (distance > 2) return null;

                            const transformOffset = distance * 10;
                            const zIndex = 50 - distance;
                            const contentVisible = distance === 0;

                            return (
                                <div
                                    key={page.id}
                                    className={`fixed left-1/2 w-[300px] h-[400px] bg-gray-50 origin-bottom transition-[height,transform,box-shadow] duration-1000 -translate-x-1/2 ${animationStyles[letterStatus]}`}
                                    style={{
                                        transform: `translateX(${transformOffset}px) translateY(${transformOffset}px)`,
                                        zIndex,
                                    }}
                                    onTransitionEnd={handleAnimationEnd}
                                >
                                    {contentVisible && (
                                        <>
                                            <p className="flex h-full text-lg font-bold">
                                                {page.content}
                                            </p>
                                            <span className='fixed right-6 bottom-6'>{i + 1}</span>
                                        </>
                                    )}
                                    {/* <p className="text-black m-4 text-sm">{currentMessage?.text}</p> */}
                                </div>
                            );
                        })}
                    </>,
                    document.body
                )
            )}
        </>
    );
}
