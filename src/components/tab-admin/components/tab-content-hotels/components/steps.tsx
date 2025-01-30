import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getCreateHotelStateStep } from '@/redux/selectors/create-hotel-selector';
import { setStep } from '@/redux/slices/create-hotel-slice';
import cn from 'classnames';
import { useCallback } from 'react';

const steps = [
    { idx: 1, name: 'Тип' },
    { idx: 2, name: 'Главное' },
    { idx: 3, name: 'Гео' },
    { idx: 4, name: 'Удобства' },
    { idx: 5, name: 'Политики' },
];

export const Steps = () => {
    const dispatch = useAppDispatch();
    const currentStep = useAppSelector(getCreateHotelStateStep);

    const handleOnClickStep = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
        dispatch(setStep(event.currentTarget.id))
    }, [dispatch]);

    return (
        <ul className="steps text-sm flex-auto">
            {steps.map((step) => (
                <li
                    onClick={(event) => handleOnClickStep(event)}
                    key={step.idx}
                    id={String(step.idx)}
                    className={cn('step cursor-pointer', { 'step-primary': step.idx <= currentStep })}
                >
                    {step.name}
                </li>
            ))}
        </ul>
    );
};
