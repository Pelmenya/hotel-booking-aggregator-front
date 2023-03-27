import { usePostAdminHotelsMutation } from '@/redux/api/admin';
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

export const HotelCreateForm = () => {
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
            <FormWrapper
                title="Добавление отеля"
                onSubmit={handleSubmit(onSubmit)}
                name="addHotel"
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
                    type="textarea"
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
            {pictures ? <PicturesGrid pictures={pictures} /> : <></>}
        </>
    );
};
