import { ComboBox } from '@/components/combo-box/combo-box';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { getCommonHotels, useGetCommonHotelsQuery } from '@/redux/api/common';
import { TError } from '@/types/t-error';
import { THotel } from '@/types/t-hotel';
import { TNullable } from '@/types/t-nullable';
import { yupResolver } from '@hookform/resolvers/yup';
import { url } from 'inspector';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { InputFile } from '../components/input-file/input-file';
import { Input } from '../components/input/input';
import { PicturesGrid } from '../components/pictures-grid/pictures-grid';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { schemaHotelForm } from '../schemas/yup.schemas';

export type TPicture = {
    url: string;
    checked: boolean;
};

export const HotelEditForm = () => {
    const dispatch = useAppDispatch();
    const [hotelTitle, setHotelTitle] = useState('');
    const [currentHotel, setCurrentHotel] = useState<TNullable<THotel>>(null);
    const { data } = useGetCommonHotelsQuery(hotelTitle);
    const [picturesFromServer, setPicturesFromServer] =
        useState<TNullable<TPicture[]>>(null);
    const [picturesFromDesktop, setPicturesFromDesktop] =
        useState<TNullable<TPicture[]>>(null);

    const [files, setFiles] = useState<FileList>();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
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

    const handlerOnChangePictures = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
                const paths = Array.from(files).map((file) =>
                    URL.createObjectURL(file)
                );
                setPicturesFromDesktop(
                    paths.map((path) => ({ url: path, checked: true }))
                );
                setFiles(files);
            }
        },
        []
    );

    const handlerSearchHotels = useCallback((title: string) => {
        setHotelTitle(title);
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
        if (hotelTitle) {
            dispatch(getCommonHotels.initiate(hotelTitle));
        }
    }, [hotelTitle, dispatch]);

    useEffect(() => {
        if (currentHotel) {
            setValue('title', currentHotel.title);
            setValue('description', currentHotel.description);
            setPicturesFromDesktop(null);
            setFiles(undefined);
            setPicturesFromServer(
                currentHotel?.images.map((pic) => ({
                    url: pic,
                    checked: true,
                }))
            );
        }
    }, [currentHotel, setValue]);

    const handlerCheckedPictureFromServer = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (picturesFromServer) {
                setPicturesFromServer(
                    picturesFromServer?.map((item) => {
                        if (
                            e.target.id ===
                            `${process.env.NEXT_PUBLIC_BASE_PICTURES_URL}${item.url}`
                        ) {
                            console.log(e.target.checked);
                            return {
                                url: item.url,
                                checked: e.target.checked,
                            };
                        }
                        return item;
                    })
                );
            }
        },
        [picturesFromServer]
    );

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
                    handlerSearchItem={handlerSearchHotels}
                    handlerSetItem={handlerSetCurrentHotel}
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
                    reset={!!!files}
                />
                <SubmitBtn
                    text="Добавить"
                    isError={false}
                    isLoading={false}
                    error={{} as TError}
                />
            </FormWrapper>
            <PicturesGrid
                pictures={
                    currentHotel?.images.map(
                        (picture) =>
                            `${process.env.NEXT_PUBLIC_BASE_PICTURES_URL}${picture}`
                    ) || []
                }
                handlerChecked={handlerCheckedPictureFromServer}
            />
        </>
    );
};
