import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import {
    getCreateHotelStateSelectedSubcategory,
    getCreateHotelStateStep,
} from '@/redux/selectors/create-hotel-selector';
import { setStep, TStep } from '@/redux/slices/create-hotel-slice';
import cn from 'classnames';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const steps = [
    { idx: 1, name: 'Тип', nameEn: 'Type' },
    { idx: 2, name: 'Главное', nameEn: 'Main' },
    { idx: 3, name: 'Удобства', nameEn: 'Amenities' },
    { idx: 4, name: 'Гео', nameEn: 'Geo' },
    { idx: 5, name: 'Политики', nameEn: 'Policies' },
];

export const Steps = () => {
    const { i18n } = useTranslation('common');
    const dispatch = useAppDispatch();
    const currentStep = useAppSelector(getCreateHotelStateStep);
    const selectedSubcategoryFromRedux = useAppSelector(
        getCreateHotelStateSelectedSubcategory
    );

    const handleOnClickStep = useCallback(
        (event: React.MouseEvent<HTMLLIElement>) => {
            if (selectedSubcategoryFromRedux) {
                dispatch(setStep(Number(event.currentTarget.id) as TStep));
            }
        },
        [dispatch, selectedSubcategoryFromRedux]
    );

    return (
        <ul className="steps text-sm flex-auto">
            {steps.map((step) => (
                <li
                    onClick={(event) => handleOnClickStep(event)}
                    key={step.idx}
                    id={String(step.idx)}
                    className={cn('step cursor-pointer', {
                        'step-primary': step.idx <= currentStep,
                    })}
                >
                    {i18n.language === 'ru' ? step.name : step.nameEn}
                </li>
            ))}
        </ul>
    );
};
