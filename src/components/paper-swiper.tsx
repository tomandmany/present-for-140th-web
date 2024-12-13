// /components/PaperSwiper.tsx

'use client';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

type Page = {
    id: number;
    content: string;
};

const PaperSwiper = () => {
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

    return (
        // 全画面をスワイプ領域にする
        <div
            {...handlers}
            className="fixed inset-0 overflow-hidden flex items-center justify-center z-letter-dialog"
        >
            <div className="relative w-3/4 h-3/4">
                {pages.map((page, i) => {
                    const distance = (i - currentIndex + len) % len;
                    if (distance > 2) return null;

                    const transformOffset = distance * 10;
                    const zIndex = 50 - distance;
                    const contentVisible = distance === 0;

                    return (
                        <div
                            key={page.id}
                            className="absolute w-full h-full bg-white rounded-lg shadow-xl transition-transform duration-500 p-10"
                            style={{
                                transform: `translateX(${transformOffset}px) translateY(${transformOffset}px)`,
                                zIndex,
                            }}
                        >
                            {contentVisible && (
                                <>
                                    <p className="flex h-full text-lg font-bold">
                                        {page.content}
                                    </p>
                                    <span className='fixed right-6 bottom-6'>{i + 1}</span>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PaperSwiper;
