import React from 'react';
import { setStep, TStep } from '@/redux/slices/create-hotel-slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getCreateHotelStateSelectedSubcategory, getCreateHotelStateStep } from '@/redux/selectors/create-hotel-selector';
import { useTranslation } from 'react-i18next';

export const StepsNav = () => {
    const { t } = useTranslation('common');
    const dispatch = useAppDispatch();
    const currentStep = useAppSelector(getCreateHotelStateStep);
    const selectedSubcategoryFromRedux = useAppSelector(
        getCreateHotelStateSelectedSubcategory
    );

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
                disabled={
                    currentStep === 1 
                }
                onClick={handlePrev}
                className="join-item btn btn-primary btn-outline"
            >
                {t('PREV_STEP_BTN', 'Предыдущий шаг')}
            </button>
            <button
                disabled={currentStep === 5 || !selectedSubcategoryFromRedux}
                onClick={handleNext}
                className="join-item btn btn-primary btn-outline"
            >
                {t('NEXT_STEP_BTN', 'Следующий шаг')}
                
            </button>
        </div>
    );
};
