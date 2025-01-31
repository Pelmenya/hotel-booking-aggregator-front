import React from 'react';
import { setStep, TStep } from '@/redux/slices/create-hotel-slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getCreateHotelStateStep } from '@/redux/selectors/create-hotel-selector';

export const StepsNav = () => {
    const dispatch = useAppDispatch();
    const currentStep = useAppSelector(getCreateHotelStateStep);

    const handlePrev = () => {
        if (currentStep > 1) {
            dispatch(setStep((currentStep - 1) as TStep));
        }
    };

    const handleNext = () => {
        if (currentStep < 5) {
            dispatch(setStep((currentStep + 1) as TStep));
        }
    };

    return (
        <div className="join grid grid-cols-2">
            <button
                disabled={currentStep === 1}
                onClick={handlePrev}
                className="join-item btn btn-primary btn-outline"
            >
                Previous step
            </button>
            <button
                disabled={currentStep === 5}
                onClick={handleNext}
                className="join-item btn btn-primary btn-outline"
            >
                Next step
            </button>
        </div>
    );
};
