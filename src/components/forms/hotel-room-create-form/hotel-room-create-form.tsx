import { usePostAdminHotelRoomMutation, usePostAdminHotelsMutation } from '@/redux/api/admin';
import { TError } from '@/types/t-error';
import { TNullable } from '@/types/t-nullable';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { InputFile } from '../components/input-file/input-file';
import { Input } from '../components/input/input';
import { PicturesGrid } from '../components/pictures-grid/pictures-grid';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { schemaHotelForm } from '../schemas/yup.schemas';
import { ComboBox } from '@/components/combo-box/combo-box';
import { useLazyGetCommonHotelsQuery } from '@/redux/api/common';
import { THotel } from '@/types/t-hotel';

export const HotelRoomCreateForm = () => {
    const [idxCurrentHotel, setIdxCurrentHotel] = useState(0);
    const [currentHotel, setCurrentHotel] = useState<TNullable<THotel>>(null);
    const [trigger, { data }] = useLazyGetCommonHotelsQuery();
    const [dropDownItems, setDropDownItems] = useState<string[]>([]);

    const [postAdminHotelRoom, { isLoading, isError, error }] =
        usePostAdminHotelRoomMutation();

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
            if (currentHotel) {
                formData.append('hotel', currentHotel?.id);
            }
            formData.append('title', dto.title);
            formData.append('description', dto.description);
            if (files) {
                Array.from(files).forEach((file) => {
                    formData.append('images', file);
                });
            }
            await postAdminHotelRoom(formData).unwrap();
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

    const handlerSearchHotels = useCallback((title: string) => {
        
    }, []);

    const handlerSetCurrentHotel = useCallback(
        (title: string) => {
            const hotel = data?.find((hotel) => hotel.title === title);
            if (hotel) {
                setCurrentHotel(hotel);
            }
        },
        [data]
    );

    useEffect(() => {
        trigger('');
    }, [data, trigger]);

    useEffect(() => {
        setDropDownItems(data?.map((hotel) => hotel.title) || []);
    }, [data]);

    useEffect(() => {
        if (data) {
            if (!currentHotel) {
                setCurrentHotel(data[0]);
            }
        }
    }, [data, currentHotel]);

    return (
        <>
            <FormWrapper
                title="Добавление варианта размещения"
                onSubmit={handleSubmit(onSubmit)}
                name="addHotelRoom"
            >
                <ComboBox
                    id="EditComboBoxRoom"
                    items={dropDownItems}
                    activeIdx={idxCurrentHotel}
                    label=""
                    handlerSearchItem={handlerSearchHotels}
                    handlerSetItem={handlerSetCurrentHotel}
                />
                <Input
                    type="text"
                    id="HotelRoomTitle"
                    placeholder="Название номера"
                    label="Название номера"
                    name="title"
                    error={!!errors.title}
                    control={control}
                />
                <Input
                    type="textarea"
                    id="HotelRoomDescription"
                    placeholder="Описание"
                    label="Описание номера"
                    name="description"
                    error={!!errors.description}
                    control={control}
                />
                <InputFile
                    name="images"
                    control={control}
                    handlerOnChange={handlerOnChangePictures}
                    multiple={true}
                    accept=""
                    id="HotelRoomImages"
                    placeholder="Фото номера"
                />
                <SubmitBtn
                    text="Добавить"
                    isError={isError}
                    isLoading={isLoading}
                    error={error as TError}
                />
            </FormWrapper>
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
