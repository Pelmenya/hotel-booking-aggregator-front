import { useDispatch } from 'react-redux';
import { 
    setHotelTitle, 
    setHotelDescription, 
    setHotelCoordinates, 
    setHotelPictures,
    setHotelFiles
} from '@/redux/slices/create-hotel-slice';
import { 
    getHotelTitle, 
    getHotelDescription, 
    getHotelCoordinates, 
    getHotelPictures,
    getHotelFiles,
    getCreateHotelStateRealEstateType
} from '@/redux/selectors/create-hotel-selector';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaHotelForm } from '../schemas/yup.schemas';
import { Input } from '../components/input/input';
import { InputFile } from '../components/input-file/input-file';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { PicturesGrid } from '../components/pictures-grid/pictures-grid';
import { Map } from '@/components/map/map';
import { transformCoordinates } from 'utils/transform-coordinates';
import { useTranslation } from 'react-i18next';
import { AddressSearchWithMap } from '@/components/address-search-with-map/address-search-with-map';
import { ChangeEvent, useEffect } from 'react';

export const HotelCreateForm = () => {
    const { t, i18n } = useTranslation('form');
    const dispatch = useDispatch();

    const selectedRealEstateTypeFromRedux = useAppSelector(getCreateHotelStateRealEstateType);
    const hotelTitleFromRedux = useAppSelector(getHotelTitle);
    const hotelDescriptionFromRedux = useAppSelector(getHotelDescription);
    const hotelCoordinatesFromRedux = useAppSelector(getHotelCoordinates);
    const hotelPicturesFromRedux = useAppSelector(getHotelPictures);
    const hotelFilesFromRedux = useAppSelector(getHotelFiles);

    const {
        control,
        getValues,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaHotelForm),
        reValidateMode: 'onChange',
    });

    const title = watch('title'); // отслеживаем изменения в поле 'title'

    useEffect(() => {
        if (title) {
            dispatch(setHotelTitle(title));
        }
    }, [title, dispatch]); // вызываем useEffect при изменении title


    const handlerOnChangePictures = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const paths = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            dispatch(setHotelPictures(paths));
            dispatch(setHotelFiles(files));
        }
    };

    return (
        <>
            <FormWrapper
                title={
                    `${i18n.language === 'ru' ? selectedRealEstateTypeFromRedux?.ru : selectedRealEstateTypeFromRedux?.en} ${hotelTitleFromRedux || ''}`
                }
                name="addHotel"
                className="py-0"
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
                <Input
                    type="text"
                    id="HotelСoordinates"
                    placeholder="Координаты"
                    label={t('LABEL_INPUT_COORDINATES', 'Координаты')}
                    name="coordinates"
                    error={!!errors.coordinates}
                    control={control}
                    onChange={() => dispatch(setHotelCoordinates(getValues('coordinates')))}
                />
                <AddressSearchWithMap />
                <Input
                    type="textarea"
                    id="HotelDescription"
                    placeholder="Описание"
                    label={t('LABEL_INPUT_HOTEL_DESCRIPTION', 'Описание отеля')}
                    name="description"
                    error={!!errors.description}
                    control={control}
                    onChange={() => dispatch(setHotelDescription(getValues('description')))}
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
            </FormWrapper>
            {hotelCoordinatesFromRedux && (
                <div className="mb-8">
                    <Map coordinates={transformCoordinates(hotelCoordinatesFromRedux)} />
                </div>
            )}
            {hotelPicturesFromRedux ? (
                <PicturesGrid
                    pictures={hotelPicturesFromRedux.map((item) => ({
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
