'use client';

import { Dispatch, SetStateAction, useState } from "react";

interface EnvelopeLidProps {
    isOpenEnvelope: boolean;
    lidStatus: 'open' | 'close';
    setLidStatus: Dispatch<SetStateAction<'open' | 'close'>>;
    letterStatus: 'inside' | 'outside';
    playSound: (speaker: 'lid' | 'letter') => void;
}

export default function EnvelopeLid({ isOpenEnvelope, lidStatus, setLidStatus, letterStatus, playSound }: EnvelopeLidProps) {
    const [isLidRotationHalf, setIsLidRotationHalf] = useState(false); // トランジションの途中状態
    const transitionDuration = 500; // トランジションの時間 (ms)

    const handleLidTransitionStart = () => {
        // トランジション時間の半分後に halfway 状態を切り替える
        setTimeout(() => {
            setIsLidRotationHalf(!isLidRotationHalf);
            if (isOpenEnvelope) {
                playSound('letter');
            }
        }, transitionDuration / 2);
    };

    const handleLidTransitionEnd = () => {
        if (isOpenEnvelope) {
            setLidStatus("open"); // 開き切ったら状態を更新
        }

        if (!isOpenEnvelope) {
            setLidStatus("close"); // 閉じ切ったら状態を更新
        }
    };

    return (
        <>
            {/* 封筒の蓋全体 */}
            <div
                className={`relative z-20 origin-top transition-transform duration-500 ${isOpenEnvelope
                    ? 'duration-[.5s] envelop-rotate'
                    : lidStatus === 'open'
                        ? letterStatus === 'inside'
                            ? 'duration-[.5s]'
                            : 'envelop-rotate'
                        : 'duration-[.5s]'
                    }`}
                onTransitionStart={handleLidTransitionStart}
                onTransitionEnd={handleLidTransitionEnd}
            >
                {/* 封筒の蓋本体 */}
                <div
                    className={`relative envelop-lid bg-black w-[242px] h-[122px] transition
                        ${isLidRotationHalf ? 'z-20' : 'z-10'}
                    `}
                >
                    {/* 蓋の内側 */}
                    <div className="envelop-lid relative left-[3px] top-[1px] w-[236px] h-[119px] bg-white" />
                </div>
                {/* 蓋のシール */}
                <div
                    className={`envelop-lid-seal outline-dotted outline-black -outline-offset-1 absolute left-1/2 -translate-x-1/2 bottom-[20px] rounded-full w-10 h-10 z-10 transition
                        ${isLidRotationHalf ? 'z-10' : 'z-20'}
                    `}
                />
            </div>
        </>
    )
}