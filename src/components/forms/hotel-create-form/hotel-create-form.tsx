import { usePostAdminHotelsMutation } from '@/redux/api/admin-api';
import { TError } from '@/types/t-error';
import { TNullable } from '@/types/t-nullable';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { InputFile } from '../components/input-file/input-file';
import { Input } from '../components/input/input';
import { PicturesGrid } from '../components/pictures-grid/pictures-grid';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { schemaHotelForm } from '../schemas/yup.schemas';
import { Map } from '@/components/map/map';
import { transformCoordinates } from 'utils/transform-coordinates';
import { useTranslation } from 'react-i18next';
import { useGetAmenitiesQuery } from '@/redux/api/amenities-api';
import { useGetRealEstateQuery } from '@/redux/api/real-estate-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons'

export const HotelCreateForm = () => {
    const { t } = useTranslation('form');

    const { data: amenities } = useGetAmenitiesQuery('ALL');
    const { data: realEstateCategories } = useGetRealEstateQuery('ALL');

    console.log({ amenities, realEstateCategories});
    
    const [coordinates, setCoordinates] = useState<TNullable<string>>(null);

    const [postAdminHotels, { isLoading, isError, error }] =
        usePostAdminHotelsMutation();

    const [pictures, setPictures] = useState<TNullable<string[]>>(null);
    const [files, setFiles] = useState<FileList>();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaHotelForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (dto: FieldValues) => {
        if (dto) {
            const formData = new FormData();
            formData.append('title', dto.title);
            formData.append('description', dto.description);
            if (dto.coordinates) {
                setCoordinates(dto.coordinates);
                const coordinates = transformCoordinates(dto.coordinates);
                formData.append('coordinates', String(coordinates[0]));
                formData.append('coordinates', String(coordinates[1]));
            }
            if (files) {
                Array.from(files).forEach((file) => {
                    formData.append('images', file);
                });
            }
            await postAdminHotels(formData).unwrap();
        }
    };

    const handlerOnChangePictures = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const paths = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setPictures(paths);
            setFiles(files);
        }
    };

    return (
        <>
            <ul className="steps">
                <li className="step step-primary">Register</li>
                <li className="step step-primary">Choose plan</li>
                <li className="step">Purchase</li>
                <li className="step">Receive Product</li>


            </ul>
            <FontAwesomeIcon icon={Icons['faConciergeBell']} />
            <FormWrapper
                title={t('TITLE_FORM_CREATE_HOTEL', 'Добавление отеля')}
                onSubmit={handleSubmit(onSubmit)}
                name="addHotel"
                className="py-0"
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
                <Input
                    type="text"
                    id="HotelСoordinates"
                    placeholder="Координаты"
                    label={t('LABEL_INPUT_COORDINATES', 'Координаты')}
                    name="coordinates"
                    error={!!errors.coordinates}
                    control={control}
                />
                <Input
                    type="textarea"
                    id="HotelDescription"
                    placeholder="Описание"
                    label={t('LABEL_INPUT_HOTEL_DESCRIPTION', 'Описание отеля')}
                    name="description"
                    error={!!errors.description}
                    control={control}
                />
                <InputFile
                    name="images"
                    control={control}
                    handlerOnChange={handlerOnChangePictures}
                    multiple={true}
                    accept="image/*"
                    id="HotelImages"
                    placeholder="Фото отеля"
                />
                <SubmitBtn
                    text="Добавить"
                    isError={isError}
                    isLoading={isLoading}
                    error={error as TError}
                />
            </FormWrapper>
            {coordinates && (
                <div className="mb-8">
                    <Map coordinates={transformCoordinates(coordinates)} />
                </div>
            )}
            {pictures ? (
                <PicturesGrid
                    pictures={pictures.map((item) => ({
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
