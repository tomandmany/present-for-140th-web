'use client';

import { Dispatch, SetStateAction, useState } from "react";

interface EnvelopeLidProps {
    isOpenEnvelope: boolean;
    lidStatus: 'open' | 'close';
    setLidStatus: Dispatch<SetStateAction<'open' | 'close'>>;
    letterStatus: 'inside' | 'outside';
    playSound: (speaker: 'lid' | 'letter') => void;
    color: string;
}

const colorMap: Record<string, string> = {
    pink: 'bg-[#F59997]',
    blue: 'bg-[#C2DDFC]',
};

export default function EnvelopeLid({ isOpenEnvelope, lidStatus, setLidStatus, letterStatus, playSound, color }: EnvelopeLidProps) {
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
                    className={`relative envelop-lid bg-black w-[212px] h-[122px] transition
                        ${isLidRotationHalf ? 'z-20' : 'z-10'}
                    `}
                >
                    {/* 蓋の内側 */}
                    <div className={`${colorMap[color]} envelop-lid absolute left-[3px] top-[1px] w-[206px] h-[119px]`} />
                </div>
            </div>
        </>
    )
}