import { HotelCreateForm } from '@/components/forms/hotel-create-form/hotel-create-form';
import { HotelDownloadImagesForm } from '@/components/forms/hotel-download-images-form/hotel-download-images-form';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getCreateHotelStateStep } from '@/redux/selectors/create-hotel-selector';
import { RealEstateAmenitiesChange } from './real-estate-amenities-change/real-estate-amenities-change';
import { RealEstateChange } from './real-estate-change/real-estate-change';
import { StepsNav } from './steps-nav';

export const CreateHotelMain = () => {
    const step = useAppSelector(getCreateHotelStateStep);

    return (
        <div className="border border-base-300 bg-base-100 rounded-box pt-0 px-4 pb-8 flex flex-col items-center gap-6 w-full">
            {step === 1 && <RealEstateChange />}
            {step === 2 && <HotelCreateForm />}
            {step === 3 && <RealEstateAmenitiesChange />}
            {step === 4 && <div>Шаг 4</div>}
            {step === 5 && <HotelDownloadImagesForm />}
            <StepsNav />
        </div>
    );
};
