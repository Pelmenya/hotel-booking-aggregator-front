import React, { useEffect, useState } from 'react';

interface CountdownProps {
    initialMinutes: number;
    initialSeconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({
    initialMinutes,
    initialSeconds,
}) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [viewCountdown, setViewCountDown ] = useState<boolean>(false);

    useEffect(() => {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        setViewCountDown(true);
    }, [initialMinutes, initialSeconds]);

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
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [seconds, minutes]);

    return (
        <>
            {viewCountdown ? 
                (<span className="countdown font-mono text-2xl">
                    <span style={{ '--value': minutes } as React.CSSProperties}></span>:
                    <span style={{ '--value': seconds } as React.CSSProperties}></span>        
                </span>) : 
                <></> 
            }

        </>
    );
};

