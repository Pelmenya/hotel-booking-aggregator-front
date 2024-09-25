import { ComboBox } from '@/components/combo-box/combo-box';
import {
    useLazyGetCommonHotelRoomsQuery,
    useLazyGetCommonHotelsQuery,
} from '@/redux/api/common-api';
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
import { usePutAdminHotelRoomsMutation } from '@/redux/api/admin-api';
import { getImageUrl } from 'utils/getImageUrl';
import { getBaseImageUrl } from 'utils/getBaseImageUrl';
import { TPicture } from '@/types/t-picture';
import { THotelRoom } from '@/types/t-hotel-room';
import { useTranslation } from 'react-i18next';

export const HotelRoomEditForm = () => {
    const { t } = useTranslation('form');
    const [, setHotelTitle] = useState(''); // для поиска в БД
    const [currentHotel, setCurrentHotel] = useState<TNullable<THotel>>(null);
    const [currentHotelRoom, setCurrentHotelRoom] =
        useState<TNullable<THotelRoom>>(null);

    const [idxCurrentHotel] = useState(0);
    const [idxCurrentHotelRoom, setIdxCurrentHotelRoom] = useState(0);

    const [triggerHotel, { data: dataHotels }] = useLazyGetCommonHotelsQuery();
    const [triggerHotelRoom, { data: dataHotelRooms }] =
        useLazyGetCommonHotelRoomsQuery();

    const [dropDownItems, setDropDownItems] = useState<string[]>([]);
    const [dropDownRoomItems, setDropDownRoomItems] = useState<string[]>([]);

    const [putAdminHotelRooms, { error, isError, isLoading }] =
        usePutAdminHotelRoomsMutation();
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
    } = useForm({
        resolver: yupResolver(schemaHotelForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (dto: FieldValues) => {
        if (dto) {
            const formData = new FormData();
            formData.append('hotel', currentHotel?.id || '');
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
                        formData.append('images', getBaseImageUrl(picture.url));
                    }
                });
            }
            const updateHotelRoom = await putAdminHotelRooms({
                body: formData,
                id: currentHotelRoom?.id,
            }).unwrap();

            if (updateHotelRoom) {
                setCurrentHotelRoom(updateHotelRoom);
                if (currentHotel) {
                    const hotelRoomsRes = await triggerHotelRoom({
                        hotel: currentHotel.id,
                    });
                    const idx =
                        hotelRoomsRes.data?.findIndex(
                            (item) => item.title === updateHotelRoom.title
                        ) || 0;
                    setIdxCurrentHotelRoom(idx);
                    setDropDownRoomItems(
                        hotelRoomsRes.data?.map((hotel) => hotel.title) || []
                    );
                }
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
            const hotel = dataHotels?.find((hotel) => hotel.title === title);
            if (hotel) {
                setCurrentHotel(hotel);
                triggerHotelRoom({ hotel: hotel.id });
            }
        },
        [dataHotels, triggerHotelRoom]
    );

    const handlerSetCurrentHotelRoom = useCallback(
        (title: string) => {
            const room = dataHotelRooms?.find((room) => room.title === title);
            if (room) {
                setCurrentHotelRoom(room);
            }
        },
        [dataHotelRooms]
    );
    useEffect(() => {
        triggerHotel('');
    }, [dataHotels, triggerHotel]);

    useEffect(() => {
        if (currentHotel) {
            triggerHotelRoom({ hotel: currentHotel.id });
        }
    }, [dataHotelRooms, triggerHotelRoom, currentHotel]);

    useEffect(() => {
        setDropDownItems(dataHotels?.map((hotel) => hotel.title) || []);
    }, [dataHotels]);

    useEffect(() => {
        setDropDownRoomItems(dataHotelRooms?.map((room) => room.title) || []);
    }, [dataHotelRooms]);

    useEffect(() => {
        if (currentHotelRoom) {
            setValue('title', currentHotelRoom.title);
            setValue('description', currentHotelRoom.description);
            setPicturesFromDesktop(null);
            setFiles(undefined);
            setPicturesFromServer(
                currentHotelRoom?.images.map((pic) => ({
                    url: getImageUrl(pic),
                    checked: true,
                }))
            );
        }
    }, [currentHotel, currentHotelRoom, setValue]);

    useEffect(() => {
        if (dataHotels) {
            if (!currentHotel) {
                setCurrentHotel(dataHotels[0]);
                triggerHotelRoom({ hotel: dataHotels[0].id });
            }
        }
    }, [dataHotels, currentHotel, triggerHotelRoom]);

    useEffect(() => {
        if (dataHotelRooms) {
            if (!currentHotelRoom) {
                setCurrentHotelRoom(dataHotelRooms[0]);
            }
        }
    }, [dataHotelRooms, currentHotelRoom, currentHotel, triggerHotelRoom]);

    useEffect(() => {
        if (currentHotelRoom) {
            setValue('title', currentHotelRoom.title);
            setValue('description', currentHotelRoom.description);
            setPicturesFromDesktop(null);
            setFiles(undefined);
            setPicturesFromServer(
                currentHotelRoom?.images.map((pic) => ({
                    url: getImageUrl(pic),
                    checked: true,
                }))
            );
        }
    }, [currentHotelRoom, setValue, currentHotel]);

    const handlerCheckedPictureFromServer = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (picturesFromServer) {
                setPicturesFromServer(
                    picturesFromServer?.map((item) => {
                        if (e.target.id === item.url) {
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

    const handlerCheckedAllPictureFromServer = useCallback(
        (isChecked: boolean) => {
            if (picturesFromServer) {
                setPicturesFromServer(
                    picturesFromServer.map((item) => ({
                        url: item.url,
                        checked: isChecked,
                    }))
                );
            }
        },
        [picturesFromServer]
    );

    return (
        <>
            <FormWrapper
                title={t('TITLE_FORM_UPDATE_HOTEL_ROOM', 'Редактирования номера')}
                onSubmit={handleSubmit(onSubmit)}
                name="editHotels"
            >
                <ComboBox
                    id="HotelsEditComboBox"
                    items={dropDownItems}
                    activeIdx={idxCurrentHotel}
                    label=""
                    handlerSearchItem={handlerSearchHotels}
                    handlerSetItem={handlerSetCurrentHotel}
                />
                {dataHotelRooms?.length ? (
                    <>
                        <ComboBox
                            id="HotelRoomsEditComboBox"
                            items={dropDownRoomItems}
                            activeIdx={idxCurrentHotelRoom}
                            label=""
                            handlerSearchItem={() => {}}
                            handlerSetItem={handlerSetCurrentHotelRoom}
                        />
                        <Input
                            type="text"
                            id="HotelRoomTitle"
                            placeholder="Название номера"
                            label={t(
                                'LABEL_INPUT_HOTEL_ROOM_NAME',
                                'Название номера'
                            )}
                            name="title"
                            error={!!errors.title}
                            control={control}
                        />
                        <Input
                            type="textarea"
                            id="HotelRoomDescription"
                            placeholder="Описание"
                            label={t(
                                'LABEL_INPUT_HOTEL_ROOM_DESCRIPTION',
                                'Описание номера'
                            )}
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
                            text="Редактировать"
                            isError={isError}
                            isLoading={isLoading}
                            error={error as TError}
                        />
                    </>
                ) : (
                    <p>Нет вариантов размещения</p>
                )}
            </FormWrapper>
            {picturesFromDesktop?.length && dataHotelRooms?.length ? (
                <>
                    <PicturesGrid
                        title={'Выбранные файлы'}
                        pictures={picturesFromDesktop || []}
                    />
                    <div className="pb-2"></div>
                </>
            ) : null}
            {picturesFromServer?.length && dataHotelRooms?.length ? (
                <PicturesGrid
                    title="Файлы с cервера"
                    pictures={picturesFromServer || []}
                    handlerChecked={handlerCheckedPictureFromServer}
                    handlerCheckedAll={handlerCheckedAllPictureFromServer}
                />
            ) : null}
        </>
    );
};
