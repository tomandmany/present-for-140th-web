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

/** テキストを指定文字数ごとに分割し、{id,content} の配列として返す */
function paginateText(text: string, maxChars: number): { id: number; content: string }[] {
    const result: { id: number; content: string }[] = [];
    let start = 0;
    let pageId = 1;
    while (start < text.length) {
        const end = Math.min(start + maxChars, text.length);
        result.push({ id: pageId, content: text.slice(start, end) });
        start = end;
        pageId++;
    }
    return result;
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
    // 1ページあたりの最大文字数（仮に150に設定。実際は調整）
    const MAX_CHARS_PER_PAGE = 150;

    // currentMessage?.text をページ分割
    const pages = paginateText(currentMessage?.text ?? '', MAX_CHARS_PER_PAGE);
    const len = pages.length;
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            // 次ページへ
            setCurrentIndex((prev) => (prev + 1) % len);
        } else if (direction === 'right') {
            // 前ページへ
            setCurrentIndex((prev) => (prev - 1 + len) % len);
        }
    };

    // スワイプ検知 (PCのドラッグ操作もスワイプ扱いで認識: trackMouse:true)
    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    // アニメーション用のスタイルマップ
    const animationStyles: Record<typeof letterStatus, string> = {
        inside: 'h-0 pointer-events-none',
        up: `-translate-y-[100vh]`,
        center: 'z-letter-dialog',
    };

    useEffect(() => {
        if (isOpenEnvelope && lidStatus === 'open') {
            setLetterStatus('up');
        } else if (!isOpenEnvelope) {
            setLetterStatus('inside');
            setCurrentIndex(0); // 閉じたらページをリセットする場合
        }
    }, [isOpenEnvelope, lidStatus, setLetterStatus]);

    const handleAnimationEnd = () => {
        if (letterStatus === 'up') {
            setLetterStatus('center');
        }
    };

    return (
        <>
            {/* 封筒から「取り出す」アニメーション中の要素 */}
            {letterStatus !== 'center' && (
                <div
                    className={`absolute top-0 left-1/2 w-[80%] bg-gray-50 origin-bottom transition-[height,transform,box-shadow] duration-1000 -translate-x-1/2 overflow-hidden z-envelope-letter ${animationStyles[letterStatus]}`}
                    onTransitionEnd={handleAnimationEnd}
                >
                    {/* 一時的に封筒の中にあるように見える段階。中身は非表示でもOK */}
                    <p className="text-black m-4 text-sm">{currentMessage.text}</p>
                </div>
            )}

            {/* レターが画面中央に展開した後のポータル */}
            {letterStatus === 'center' && (
                createPortal(
                    <>
                        <div
                            {...handlers}
                            className="fixed inset-0 bg-zinc-900/80 z-letter-dialog-bg"
                            onClick={() => handleToggleEnvelope(writer)}
                        >
                            <div className="relative h-[100svh] flex justify-center items-center">
                                {pages.map((page, i) => {
                                    const distance = (i - currentIndex + len) % len;
                                    // 0: 現在ページ、1: 次ページ、2: 次々ページ 以外は非表示
                                    if (distance > 2) return null;

                                    const transformOffset = distance * 10; 
                                    const zIndex = 50 - distance;
                                    const contentVisible = distance === 0;

                                    return (
                                        <div
                                            key={page.id}
                                            className={`absolute cursor-grab select-none w-[300px] h-[400px] shadow-xl p-4 bg-[#EFEEE5] origin-bottom transition-[height,transform,box-shadow] duration-1000 ${animationStyles[letterStatus]}`}
                                            style={{
                                                transform: `translateX(${transformOffset}px) translateY(${transformOffset}px)`,
                                                zIndex,
                                            }}
                                            onTransitionEnd={handleAnimationEnd}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {contentVisible && (
                                                <>
                                                    <p className="flex h-full text-lg font-bold whitespace-pre-wrap overflow-auto">
                                                        {page.content}
                                                    </p>
                                                    <span className='fixed right-6 bottom-6'>
                                                        {`${i + 1}/${len}`}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>,
                    document.body
                )
            )}
        </>
    );
}
