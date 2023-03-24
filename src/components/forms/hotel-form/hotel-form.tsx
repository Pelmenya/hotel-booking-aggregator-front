import { postAdminHotels, usePostAdminHotelsMutation } from '@/redux/api/admin';
import { TError } from '@/types/t-error';
import { TNullable } from '@/types/t-nullable';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Carousel } from '../components/carousel/carousel';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { InputFile } from '../components/input-file/input-file';
import { Input } from '../components/input/input';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { schemaHotelForm } from '../schemas/yup.schemas';

export const HotelForm = () => {
    const [postAdminHotels, { isLoading, isError, error }] =
        usePostAdminHotelsMutation();

    const [pictures, setPictures] = useState<TNullable<string[]>>(null);

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
            console.log(dto);
            /*             const postHotel = await postAdminHotels(dto).unwrap();
            if (postHotel) {
                console.log(postHotel);
            }
 */
        }
    };

    const handlerOnChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const paths = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setPictures(paths);
            console.log(paths)

        }

    };

    return (
        <>
            <FormWrapper
                title="Добавление отеля"
                onSubmit={handleSubmit(onSubmit)}
                name="addHotels"
            >
                <Input
                    type="text"
                    id="HotelTitle"
                    placeholder="Название отеля"
                    label="Название отеля"
                    name="title"
                    error={!!errors.title}
                    control={control}
                />
                <Input
                    type="text"
                    id="HotelDescription"
                    placeholder="Описание"
                    label="Описание отеля"
                    name="description"
                    error={!!errors.description}
                    control={control}
                />
                <InputFile
                    name="images"
                    control={control}
                    handlerOnChange={handlerOnChangePicture}
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
            {pictures ? <Carousel pictures={pictures} /> : <></>}
        </>
    );
};
