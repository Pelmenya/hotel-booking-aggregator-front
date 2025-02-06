import { useDispatch } from 'react-redux';
import {
    setHotelTitle,
} from '@/redux/slices/create-hotel-slice';
import {
    getHotelTitle,
    getCreateHotelStateRealEstateType,
} from '@/redux/selectors/create-hotel-selector';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaHotelForm } from '../schemas/yup.schemas';
import { Input } from '../components/input/input';
import { InputFile } from '../components/input-file/input-file';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { PicturesGrid } from '../components/pictures-grid/pictures-grid';
import { useTranslation } from 'react-i18next';
import { AddressSearchWithMap } from '@/components/address-search-with-map/address-search-with-map';
import { ChangeEvent, useEffect, useState } from 'react';

export const HotelCreateForm = () => {
    const { t, i18n } = useTranslation('form');
    const dispatch = useDispatch();
    const [hotelPictures, setHotelPictures] = useState<string[]>([]);

    const selectedRealEstateTypeFromRedux = useAppSelector(
        getCreateHotelStateRealEstateType
    );
    const hotelTitleFromRedux = useAppSelector(getHotelTitle);

    const {
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schemaHotelForm),
        reValidateMode: 'onChange',
    });

    const title = watch('title');

    useEffect(() => {
        if (title || title === '') dispatch(setHotelTitle(title));
    }, [title, dispatch]);

    useEffect(() => {
        reset({
            title: hotelTitleFromRedux,
        });
    }, [hotelTitleFromRedux, reset]);

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
                <Input
                    type="text"
                    id="HotelTitle"
                    placeholder="Название отеля"
                    label={t('LABEL_INPUT_HOTEL_NAME', 'Название отеля')}
                    name="title"
                    error={!!errors.title}
                    control={control}
                />

                <AddressSearchWithMap />
            </FormWrapper>
        </>
    );
};
