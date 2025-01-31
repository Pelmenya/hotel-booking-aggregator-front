import AddressSearch from '@/components/address-search/address-search';
import { HotelCreateForm } from '@/components/forms/hotel-create-form/hotel-create-form';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getCreateHotelStateStep } from '@/redux/selectors/create-hotel-selector';
import { RealEstateChange } from './real-estate-change';
import { StepsNav } from './steps-nav';

export const CreateHotelMain = () => {
    const step = useAppSelector(getCreateHotelStateStep);

    return (
        <div className="border border-base-300 bg-base-100 rounded-box pt-0 px-4 pb-8 flex flex-col items-center gap-6 w-full">
            {step === 1 && <RealEstateChange />}
            {step === 2 && (
                <>
                    <HotelCreateForm />
                    <AddressSearch />
                </>
            )}
            {step === 3 && <div>Шаг 3</div>}
            {step === 4 && <div>Шаг 4</div>}
            {step === 5 && <div>Шаг 5</div>}
            <StepsNav />
        </div>
    );
};
