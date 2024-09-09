import { ComboBox } from '@/components/combo-box/combo-box';
import { useLazyGetCommonHotelsQuery } from '@/redux/api/common';
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
import { getImageUrl } from 'utils/getImageUrl';
import { getBaseImageUrl } from 'utils/getBaseImageUrl';
import { TPicture } from '@/types/t-picture';
import { transformCoordinates } from 'utils/transformCoordinates';
import { Map } from '@/components/map/map';
import { useTranslation } from 'react-i18next';

export const HotelEditForm = () => {
    const  { t } = useTranslation('form');
    const [coordinates, setCoordinates] = useState<TNullable<number[]>>(null);
    const [, setHotelTitle] = useState(''); // для поиска в БД
    const [currentHotel, setCurrentHotel] = useState<TNullable<THotel>>(null);
    const [idxCurrentHotel, setIdxCurrentHotel] = useState(0);
    const [trigger, { data }] = useLazyGetCommonHotelsQuery();
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

            if (picturesFromServer) {
                picturesFromServer.forEach((picture) => {
                    if (picture.checked) {
                        formData.append('images', getBaseImageUrl(picture.url));
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
                const idx =
                    hotelsRes.data?.findIndex(
                        (item) => item.title === updateHotel.title
                    ) || 0;
                setIdxCurrentHotel(idx);
                setDropDownItems(
                    hotelsRes.data?.map((hotel) => hotel.title) || []
                );
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
    }, [data, trigger]);

    useEffect(() => {
        setDropDownItems(data?.map((hotel) => hotel.title) || []);
    }, [data]);

    useEffect(() => {
        if (currentHotel) {
            setValue('title', currentHotel.title);
            setValue('description', currentHotel.description);
            if (currentHotel.coordinates.length) {
                setValue(
                    'coordinates',
                    `${currentHotel.coordinates[0]},${currentHotel.coordinates[1]}`
                );
                setCoordinates(currentHotel.coordinates);
            } else {
                setValue('coordinates', '');
                setCoordinates(null);
            }

            setPicturesFromDesktop(null);
            setFiles(undefined);
            setPicturesFromServer(
                currentHotel?.images.map((pic) => ({
                    url: getImageUrl(pic),
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
                title={t('TITLE_FORM_UPDATE_HOTEL', 'Редактирования отеля')}
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
                    label={t('LABEL_INPUT_HOTEL_NAME', 'Название отеля')}
                    name="title"
                    error={!!errors.title}
                    control={control}
                />
                <Input
                    type="text"
                    id="HotelСoordinates"
                    placeholder="Координаты"
                    label={t('LABEL_INPUT_COORDINATES','Координаты')}
                    name="coordinates"
                    error={!!errors.coordinates}
                    control={control}
                />
                <Input
                    type="textarea"
                    id="HotelDescription"
                    placeholder="Описание"
                    label={t('LABEL_INPUT_HOTEL_DESCRIPTION','Описание отеля')}
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
            </FormWrapper>
            {coordinates && (
                <div className="mb-8">
                    <Map coordinates={coordinates} />
                </div>
            )}
            {picturesFromDesktop?.length ? (
                <>
                    <PicturesGrid
                        title={'Выбранные файлы'}
                        pictures={picturesFromDesktop || []}
                    />
                    <div className="pb-2"></div>
                </>
            ) : null}
            {picturesFromServer?.length ? (
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
