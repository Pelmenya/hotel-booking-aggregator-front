import { ComboBox } from '@/components/combo-box/combo-box';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { getCommonHotels, useGetCommonHotelsQuery, useLazyGetCommonHotelsQuery } from '@/redux/api/common';
import { TError } from '@/types/t-error';
import { THotel } from '@/types/t-hotel';
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
import { usePutAdminHotelsMutation } from '@/redux/api/admin';
import { title } from 'process';

export type TPicture = {
    url: string;
    checked: boolean;
};

export const HotelEditForm = () => {
    const dispatch = useAppDispatch();
    const [hotelTitle, setHotelTitle] = useState(''); // для поиска в БД
    const [currentHotel, setCurrentHotel] = useState<TNullable<THotel>>(null);
    const [idxCurrentHotel, setIdxCurrentHotel] = useState(0);
    const [ trigger, { data }] = useLazyGetCommonHotelsQuery();
    const [dropDownItems, setDropDownItems] = useState<string[]>([]);

    const [putAdminHotels, { error, isError, isLoading }] =
        usePutAdminHotelsMutation();
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

            if (picturesFromServer) {
                picturesFromServer.forEach((picture) => {
                    if (picture.checked) {
                        formData.append('images', picture.url);
                    }
                });
            }
            const updateHotel = await putAdminHotels({
                body: formData,
                id: currentHotel?.id,
            }).unwrap();

            if (updateHotel) {
                setCurrentHotel(updateHotel);
                const hotelsRes = await trigger('');
                const idx = hotelsRes.data?.findIndex((item) =>  item.title === updateHotel.title) || 0;
                setIdxCurrentHotel(idx);
                setDropDownItems(hotelsRes.data?.map((hotel) => hotel.title) || [])
            }
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
        trigger('');
    }, [data, trigger])


    useEffect(() => {
        setDropDownItems(data?.map((hotel) => hotel.title) || []);
    }, [data]);


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

    useEffect(() => {
        if (data) {
            if (!currentHotel) {
                setCurrentHotel(data[0]);
            }
        }
    }, [data, currentHotel]);

    const handlerCheckedPictureFromServer = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (picturesFromServer) {
                setPicturesFromServer(
                    picturesFromServer?.map((item) => {
                        if (
                            e.target.id ===
                            `${process.env.NEXT_PUBLIC_BASE_PICTURES_URL}${item.url}`
                        ) {
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
                    items={dropDownItems}
                    activeIdx={idxCurrentHotel}
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
                    text="Редактировать"
                    isError={isError}
                    isLoading={isLoading}
                    error={error as TError}
                />
            </FormWrapper>
            <PicturesGrid
                title={'Файлы с cервера'}
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