import {
    setCondition,
    setCountGuests,
    setCountRooms,
    setHotelArea,
    setHotelCondition,
    setHotelFloor,
    setHotelTitle,
    setKitchenType,
} from '@/redux/slices/create-hotel-slice';
import {
    getHotelTitle,
    getCreateHotelStateRealEstateType,
    getCreateHotelStateSelectedCategory,
    getHotelCondition,
    getHotelArea,
    getHotelFloor,
    getHotelKitchenType,
    getHotelCountRooms,
    getHotelCountGuests,
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
import { conditionTypes, getNumbersFabric, kitchenTypes } from './constants';
import { Counter } from '../components/counter/counter';
import { BedsTypeSelector } from '../components/beds-type-selector/beds-type-selector';

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
    const hotelConditionFromRedux = useAppSelector(getHotelCondition);
    const hotelAreaFromRedux = useAppSelector(getHotelArea);
    const hotelFloorFromRedux = useAppSelector(getHotelFloor);
    const hotelKitchenTypeFromRedux = useAppSelector(getHotelKitchenType);
    const hotelCountRoomsFromRedux = useAppSelector(getHotelCountRooms);
    const hotelCountGuestsFromRedux = useAppSelector(getHotelCountGuests);

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
    const area = watch('area');
    const countRooms = watch('countRooms');
    const countGuests = watch('countGuests');

    const kitchenType = watch('kitchenType');

    useEffect(() => {
        if (title !== undefined) dispatch(setHotelTitle(title));
    }, [title, dispatch]);

    useEffect(() => {
        if (area !== undefined) dispatch(setHotelArea(area));
    }, [area, dispatch]);



    useEffect(() => {
        if (kitchenType !== undefined) dispatch(setKitchenType(kitchenType));
    }, [kitchenType, dispatch]);

    useEffect(() => {
        if (countRooms !== undefined) dispatch(setCountRooms(countRooms));
    }, [countRooms, dispatch]);

    useEffect(() => {
        if (countGuests !== undefined) dispatch(setCountGuests(countGuests));
    }, [countGuests, dispatch]);

    useEffect(() => {
        reset({
            title: hotelTitleFromRedux,
            area: hotelAreaFromRedux,
            floor: hotelFloorFromRedux,
            kitchenType: hotelKitchenTypeFromRedux,
            condition: hotelConditionFromRedux,
            countRooms: hotelCountRoomsFromRedux,
            countGuests: hotelCountGuestsFromRedux,
            // другие поля
        });
    }, [
        hotelTitleFromRedux,
        hotelAreaFromRedux,
        hotelFloorFromRedux,
        hotelKitchenTypeFromRedux,
        hotelConditionFromRedux,
        hotelCountRoomsFromRedux,
        hotelCountGuestsFromRedux,
        reset,
    ]);

    useEffect(() => {
        if (title || title === '') dispatch(setHotelTitle(title));
    }, [title, dispatch]);

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
                <div className="divider divider-info p-4">Основное</div>

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
                                handlerSetItem={(value) => {
                                    dispatch(setHotelFloor(Number(value) - 1));
                                }}
                                items={getNumbersFabric(100)}
                                activeIdx={hotelFloorFromRedux}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <ListBox
                                id="HotelKitchen"
                                label={t('LABEL_INPUT_HOTEL_KITCHEN', 'Кухня')}
                                handlerSetItem={(value) => dispatch(setKitchenType(value))}
                                items={kitchenTypes}
                                activeIdx={kitchenTypes.findIndex(kitchen => kitchen === hotelKitchenTypeFromRedux)}
                            />
                            <ListBox
                                id="HotelCondition"
                                label={t(
                                    'LABEL_INPUT_HOTEL_CONDITION',
                                    'Состояние'
                                )}
                                handlerSetItem={(value) => dispatch(setHotelCondition(value))}
                                items={conditionTypes}
                                activeIdx={conditionTypes.findIndex(condition => condition === hotelConditionFromRedux)}
                            />
                        </div>
                        <div className="divider divider-info p-4">Гости</div>
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
                            <BedsTypeSelector />
                        </div>
                    </>
                )}
            </FormWrapper>
        </>
    );
};
