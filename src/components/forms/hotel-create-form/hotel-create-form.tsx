import { useDispatch } from 'react-redux';
import { setHotelTitle } from '@/redux/slices/create-hotel-slice';
import {
    getHotelTitle,
    getCreateHotelStateRealEstateType,
    getCreateHotelStateSelectedCategory,
} from '@/redux/selectors/create-hotel-selector';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaHotelForm } from '../schemas/yup.schemas';
import { Input } from '../components/input/input';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { useTranslation } from 'react-i18next';
import { AddressSearchWithMap } from '@/components/address-search-with-map/address-search-with-map';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { ListBox } from '@/components/list-box/list-box';
import { getNumbersFabric } from './constants';
import { Counter } from '../components/counter/counter';

export const HotelCreateForm = () => {
    const { t, i18n } = useTranslation('form');
    const dispatch = useAppDispatch();

    const selectedRealEstateCategoryFrom = useAppSelector(
        getCreateHotelStateSelectedCategory
    );

    const selectedRealEstateTypeFromRedux = useAppSelector(
        getCreateHotelStateRealEstateType
    );

    const hotelTitleFromRedux = useAppSelector(getHotelTitle);

    const {
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schemaHotelForm),
        reValidateMode: 'onChange',
    });

    const title = watch('title');

    useEffect(() => {
        if (title || title === '') dispatch(setHotelTitle(title));
    }, [title, dispatch]);

    useEffect(() => {
        reset({
            title: hotelTitleFromRedux,
        });
    }, [hotelTitleFromRedux, reset]);

    return (
        <>
            <FormWrapper
                title={`${
                    i18n.language === 'ru'
                        ? selectedRealEstateTypeFromRedux?.ru
                        : selectedRealEstateTypeFromRedux?.en
                } ${hotelTitleFromRedux || ''}`}
                name="addHotel"
                className="py-0"
                maxWidth="max-w-lg"
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

                <AddressSearchWithMap />
                {Number(selectedRealEstateCategoryFrom) > 2 && (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                type="digital"
                                id="HotelArea"
                                placeholder="Площадь"
                                label={t('LABEL_INPUT_HOTEL_AREA', 'Площадь')}
                                name="area"
                                error={!!errors.title}
                                control={control}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                }}
                            />
                            <ListBox
                                id="HotelFloor"
                                label={t('LABEL_INPUT_HOTEL_FLOOR', 'Этаж')}
                                handlerSetItem={() => {}}
                                items={getNumbersFabric(100)}
                                activeIdx={null}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Counter
                                control={control}
                                name="countRooms"
                                label="Комнаты"
                                error={false}
                            />
                            <Counter
                                control={control}
                                name="countBeds"
                                label="Кровати"
                                error={false}
                            />

                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <ListBox
                                id="HotelRooms"
                                label={t(
                                    'LABEL_INPUT_HOTEL_ROOMS',
                                    'Кол-во комнат'
                                )}
                                handlerSetItem={() => {}}
                                items={getNumbersFabric(100)}
                                activeIdx={null}
                            />
                            <ListBox
                                id="HotelBeds"
                                label={t(
                                    'LABEL_INPUT_HOTEL_BEDS',
                                    'Спальных мест'
                                )}
                                handlerSetItem={() => {}}
                                items={getNumbersFabric(100)}
                                activeIdx={null}
                            />
                        </div>
                    </>
                )}
            </FormWrapper>
        </>
    );
};
