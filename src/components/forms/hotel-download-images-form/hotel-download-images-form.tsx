import {
    getHotelTitle,
    getCreateHotelStateRealEstateType,
} from '@/redux/selectors/create-hotel-selector';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaHotelForm } from '../schemas/yup.schemas';
import { InputFile } from '../components/input-file/input-file';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { PicturesGrid } from '../components/pictures-grid/pictures-grid';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useState } from 'react';

export const HotelDownloadImagesForm = () => {
    const { t, i18n } = useTranslation('form');

    const [hotelPictures, setHotelPictures] = useState<string[]>([]);

    const selectedRealEstateTypeFromRedux = useAppSelector(
        getCreateHotelStateRealEstateType
    );
    const hotelTitleFromRedux = useAppSelector(getHotelTitle);

    const {
        control,
    } = useForm({
        resolver: yupResolver(schemaHotelForm),
        reValidateMode: 'onChange',
    });

    const handlerOnChangePictures = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const paths = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setHotelPictures(paths);
        }
    };

    return (
        <>
            <FormWrapper
                title={`${
                    i18n.language === 'ru'
                        ? selectedRealEstateTypeFromRedux?.ru
                        : selectedRealEstateTypeFromRedux?.en
                } ${hotelTitleFromRedux || ''}`}
                name="addHotel"
                className="py-0"
                maxWidth='max-w-lg'
                onSubmit={() => {}}
            >
                <div className="flex flex-col gap-2">
                    <p className="text-sm">
                        {t('FORM_ACTION_DOWNLOAD_PHOTO', 'Загрузить фото')}
                    </p>
                    <InputFile
                        name="images"
                        control={control}
                        handlerOnChange={handlerOnChangePictures}
                        multiple={true}
                        accept="image/*"
                        id="HotelImages"
                        placeholder="Фото отеля"
                    />
                </div>
            </FormWrapper>
            {hotelPictures ? (
                <PicturesGrid
                    pictures={hotelPictures.map((item) => ({
                        url: item,
                        checked: false,
                    }))}
                />
            ) : (
                <></>
            )}
        </>
    );
};
