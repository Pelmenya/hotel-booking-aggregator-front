import { ComboBox } from '@/components/combo-box/combo-box';
import { ListBox } from '@/components/list-box/list-box';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import {
    getHotels,
    getRunningQueriesThunk,
    useGetHotelsQuery,
} from '@/redux/api/common';
import { TError } from '@/types/t-error';
import { THotel } from '@/types/t-hotel';
import { TNullable } from '@/types/t-nullable';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { InputFile } from '../components/input-file/input-file';
import { Input } from '../components/input/input';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { schemaHotelForm } from '../schemas/yup.schemas';

export const HotelEditForm = () => {
    const dispatch = useAppDispatch();
    const [hotelTitle, setHotelTitle] = useState('');
    const { data } = useGetHotelsQuery(hotelTitle);
    const [pictures, setPictures] = useState<TNullable<string[]>>(null);
    const [files, setFiles] = useState<FileList>();

    useEffect(() => {
        if (hotelTitle) {
            dispatch(getHotels.initiate(hotelTitle));
        }
    }, [hotelTitle, dispatch]);

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
            /*             const postHotel = await postAdminHotels(formData).unwrap();
            if (postHotel) {
                console.log(postHotel);
            } */
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

    const handlerSearchHotels = (value: string) => {
        setHotelTitle(value);
    };

    return (
        <>
            <FormWrapper
                title="Редактирования отеля"
                onSubmit={handleSubmit(onSubmit)}
                name="editHotels"
            >
                <ComboBox
                    id="EditComboBox"
                    items={data?.map((hotel) => hotel.title) || []}
                    activeIdx={0}
                    label=""
                    handlerSetItem={handlerSearchHotels}
                />
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
                    isError={false}
                    isLoading={false}
                    error={{} as TError}
                />
            </FormWrapper>
        </>
    );
};
