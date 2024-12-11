// app/components/envelop.tsx
'use client';

import { useEffect, useRef, useState } from "react";

export default function Envelop() {
    const [isOpenEnvelop, setIsOpenEnvelop] = useState(false); // 蓋の開閉状態
    const [lidStatus, setLidStatus] = useState<'open' | 'close'>('close');
    const [letterStatus, setLetterStatus] = useState<'inside' | 'outside'>('inside');
    const [isLidRotationHalf, setIsLidRotationHalf] = useState(false); // トランジションの途中状態
    const audioLidRef = useRef<HTMLAudioElement | null>(null);
    const audioLetterRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        console.log('lidStatus: ', lidStatus);
    }, [lidStatus]);

    useEffect(() => {
        console.log('letterStatus: ', letterStatus);
    }, [letterStatus]);

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

    const handleToggleEnvelope = () => {
        if (!isOpenEnvelop) {
            playSound('lid');
        }

        if (isOpenEnvelop) {
            playSound('letter');
        }
        setIsOpenEnvelop(!isOpenEnvelop);
    };

    const transitionDuration = 500; // トランジションの時間 (ms)

    const handleLidTransitionStart = () => {
        // トランジション時間の半分後に halfway 状態を切り替える
        setTimeout(() => {
            setIsLidRotationHalf(!isLidRotationHalf);
        }, transitionDuration / 2);
    };

    const handleLidTransitionEnd = () => {
        if (isOpenEnvelop) {
            setLidStatus("open"); // 開き切ったら状態を更新
            playSound('letter');
        }

        if (!isOpenEnvelop) {
            setLidStatus("close"); // 閉じ切ったら状態を更新
        }
    };

    const handleLetterStatus = () => {
        if (isOpenEnvelop) {
            setLetterStatus("outside");
        }

        if (!isOpenEnvelop) {
            setLetterStatus("inside");
            playSound('lid');
        }
    }

    const [envelopScale, setEnvelopScale] = useState(''); // スケールクラス

    // 蓋が開いた瞬間にスケール変更
    useEffect(() => {
        if (isOpenEnvelop && lidStatus === 'open') {
            setEnvelopScale('scale-125 translate-y-10');
        }
    }, [isOpenEnvelop, lidStatus]);

    // 手紙が inside になった瞬間にスケール変更
    useEffect(() => {
        if (!isOpenEnvelop && letterStatus === 'inside') {
            setEnvelopScale('');
        }
    }, [isOpenEnvelop, letterStatus]);

    return (
        <div
            className={`relative w-[242px] h-[122px] z-10 cursor-pointer transition duration-500 ${envelopScale}`}
            onClick={handleToggleEnvelope}
        >
            <audio ref={audioLidRef} src="/audio/lid.mp3" />
            <audio ref={audioLetterRef} src="/audio/letter.mp3" />

            {/* 封筒の本体 */}
            <div className="absolute left-0 top-0 w-full h-full border border-black bg-white z-10" />

            <div
                className={`relative z-20 origin-top transition-transform ${isOpenEnvelop
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
                {/* 封筒の蓋 */}
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

            {/* 手紙 */}
            <div
                className={`z-20 absolute top-0 left-1/2 w-[80%] bg-gray-50 origin-bottom transition-[height,opacity,transform,box-shadow] duration-[.5s] 
                    ${isOpenEnvelop
                        ? lidStatus === 'open'
                            ? 'h-[230px] pointer-events-auto -translate-y-[240px] shadow'
                            : 'h-0 pointer-events-none'
                        : 'h-0 pointer-events-none'
                    } -translate-x-1/2 overflow-hidden`}
                onTransitionEnd={handleLetterStatus}
            >
                <p className="text-black m-4 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nulla, commodi tempora temporibus blanditiis dolorum, itaque culpa labore expedita ullam possimus ipsum in sint mollitia sit recusandae atque corrupti impedit!</p>
            </div>
        </div>
    );
}
