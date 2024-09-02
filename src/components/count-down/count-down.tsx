import React, { useEffect, useState, CSSProperties } from 'react';
import cn from 'classnames';

interface CountdownProps {
    initialMinutes: number;
    initialSeconds: number;
    view: boolean;
    textSize?: string;
    handlerViewCountDown: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({
    initialMinutes,
    initialSeconds,
    view,
    handlerViewCountDown,
    textSize,
}) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [viewCountdown, setViewCountDown] = useState<boolean>(view);

    useEffect(() => {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        setViewCountDown(view);
    }, [initialMinutes, initialSeconds, view]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(timer);
                }
            }
            if (minutes === 0 && seconds === 0) {
                setViewCountDown(false);
                handlerViewCountDown();
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [seconds, minutes, handlerViewCountDown]);

    return (
        <>
            {viewCountdown ? (
                <span
                    className={cn(
                        'countdown font-mono',
                        textSize ? textSize : 'text-2xl'
                    )}
                >
                    <span
                        style={{ '--value': minutes } as CSSProperties}
                    ></span>
                    :
                    <span
                        style={{ '--value': seconds } as CSSProperties}
                    ></span>
                </span>
            ) : (
                <></>
            )}
        </>
    );
};
