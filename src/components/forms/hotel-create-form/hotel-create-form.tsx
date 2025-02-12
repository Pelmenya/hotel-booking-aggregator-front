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

const bedTypes = [
    { type: 'Односпальная кровать', size: '90x200 см', persons: 1 },
    { type: 'Двуспальная кровать', size: '140x200 см', persons: 2 },
    { type: 'Двуспальный диван-кровать', size: '160x200 см', persons: 2 },
    { type: 'Двуспальная широкая (king-size)', size: '180x200 см', persons: 2 },
    {
        type: 'Особо широкая двуспальная (super-king-size)',
        size: '200x200 см',
        persons: 2,
    },
    { type: 'Двухъярусная кровать', size: '90x200 см', persons: 1 },
    { type: 'Диван-кровать', size: '160x200 см', persons: 2 },
    { type: 'Полутороспальная кровать', size: '120x200 см', persons: 1 },
    { type: 'Кресло-кровать', size: '80x200 см', persons: 1 },
];

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
                            <ListBox
                                id="HotelKitchen"
                                label={t('LABEL_INPUT_HOTEL_KITCHEN', 'Кухня')}
                                handlerSetItem={() => {}}
                                items={[
                                    'Нет кухни',
                                    'Отдельная кухня',
                                    'Кухонная зона',
                                    'Кухня-столовая',
                                ]}
                                activeIdx={null}
                            />
                            <ListBox
                                id="HotelCondition"
                                label={t(
                                    'LABEL_INPUT_HOTEL_CONDITION',
                                    'Состояние'
                                )}
                                handlerSetItem={() => {}}
                                items={[
                                    'Без ремонта',
                                    'Косметический ремонт',
                                    'Евро ремонт',
                                    'Дизайнерский ремонт',
                                ]}
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
                                name="countGuests"
                                label="Максимально гостей"
                                error={false}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <ListBox
                                id="HotelBeds"
                                label={t(
                                    'LABEL_INPUT_HOTEL_BEDS',
                                    'Спальное место'
                                )}
                                handlerSetItem={() => {}}
                                items={bedTypes.map(bed => bed.type)}
                                activeIdx={null}
                                tooltips={bedTypes.map(bed => `Размер: ${bed.size}, Кол-во человек: ${bed.persons}`)}
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
