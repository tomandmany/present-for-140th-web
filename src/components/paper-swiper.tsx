// /components/PaperSwiper.tsx

'use client';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const PaperSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pages = [
    { id: 1, content: 'Page 1: Welcome!' },
    { id: 2, content: 'Page 2: Swipe left or right' },
    { id: 3, content: 'Page 3: Another Page!' },
    { id: 4, content: 'Page 4: More Pages!' },
    { id: 5, content: 'Page 5: Even More!' },
  ];
  const len = pages.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      // 次へ（ページをめくる）
      setCurrentIndex((prev) => (prev + 1) % len);
    } else if (direction === 'right') {
      // 前へ戻る
      setCurrentIndex((prev) => (prev - 1 + len) % len);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventScrollOnSwipe: true,
  });

  return (
    <div
      {...handlers}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-100"
    >
      {pages.map((page, i) => {
        // currentIndexを基準とした距離を計算
        const distance = (i - currentIndex + len) % len;

        // 表示ルール:
        // distance == 0: 現在ページ（コンテンツ表示）
        // distance == 1: 次ページ（白紙表示）
        // distance == 2: 次々ページ（白紙表示）
        // その他は一切レンダーしない
        if (distance > 2) {
          return null;
        }

        let transformX = 0;
        let transformY = 0;
        let zIndex = 50;
        let contentVisible = false; // コンテンツ表示フラグ

        if (distance === 0) {
          // 現在ページ（最前面、コンテンツあり）
          transformX = 0;
          transformY = 0;
          zIndex = 50;
          contentVisible = true;
        } else if (distance === 1) {
          // 次ページ（白紙、少し右下へ）
          transformX = 10;
          transformY = 10;
          zIndex = 49;
        } else if (distance === 2) {
          // 次々ページ（白紙、もう少し右下へ）
          transformX = 20;
          transformY = 20;
          zIndex = 48;
        }

        return (
          <div
            key={page.id}
            className="fixed w-3/4 h-3/4 bg-white rounded-lg shadow-xl transition-transform duration-500"
            style={{
              transform: `translateX(${transformX}px) translateY(${transformY}px)`,
              zIndex,
            }}
          >
            {contentVisible && (
              <div className="flex items-center justify-center h-full text-lg font-bold">
                {page.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PaperSwiper;
