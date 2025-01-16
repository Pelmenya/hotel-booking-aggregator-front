import { useMemo, useState } from 'react';
import { Base } from '@/components/base/base';
import { CarouselFullPicPreview } from '@/components/carousel-full-pic-preview/carousel-full-pic-preview';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { Modal } from '@/components/modal/modal';
import { useTranslation } from 'react-i18next';
import { THotelPageProps } from '../hotel-page';
import Rating from '../../../../icons/hand-thumb-up.svg';
import Ostrovok from '../../../../icons/ostrovok/ostrovok.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getIconByGeoDataCategory } from '@/icons/fortawesome/get-icon-by-geo-data-category';
import { getIconByAmenity } from '@/icons/fortawesome/get-icon-by-amenity';

export type THotelHeadProps = THotelPageProps & {
    hotelAddress: string;
};

export const HotelHead = ({ data, hotelAddress }: THotelHeadProps) => {
    const { t, i18n } = useTranslation('common');
    const [isOpenModal, setIsOpenModal] = useState(false);

    const toggleModal = () => setIsOpenModal((prev) => !prev);

    const hotelName = useMemo(() => {
        if (!data || !data.hotel) return '';

        // Получаем имя отеля в зависимости от языка
        const name =
            i18n.language === 'ru'
                ? data.hotel.name || data.hotel.name_en
                : data.hotel.name_en || data.hotel.name;

        // Проверка, содержит ли имя отеля звезды, и формирование строки со звездами
        const cleanedName = name?.replace(new RegExp('\\s?\\d*\\*'), '');
        const stars = data.hotel.stars ? `, ${data.hotel.stars}*` : '';

        return `${cleanedName}${stars}`;
    }, [data, i18n.language]);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_OSTROVOK || '';

    const linkOstrovok = useMemo(
        () => baseUrl + data?.hotel.hotel_link_ostrovok,
        [baseUrl, data]
    );

    return (
        <Base>
            {data?.images.length && (
                <Modal isOpen={isOpenModal} handlerClose={toggleModal}>
                    <CarouselFullPicPreview
                        images={data.images}
                        name={hotelName}
                    />
                </Modal>
            )}
            <div className="flex flex-col gap-1">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-black text-2xl md:text-2xl lg:text-4xl max-w-[900px]">
                            {hotelName}
                        </h1>
                        <p className="text-primary">{hotelAddress}</p>
                        {data?.amenities &&
                            Array.isArray(data.amenities.en) &&
                            Array.isArray(data.amenities.ru) &&
                            data.amenities.en.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                {(i18n.language === 'ru'
                                    ? data.amenities.ru
                                    : data.amenities.en
                                )
                                    .filter(
                                        (item) => item.type === 'main'
                                    )[0]
                                    .amenities_list.map((item) => (
                                        <p
                                            className="badge badge-sm md:badge-md badge-ghost"
                                            key={item.idx}
                                        >
                                            {
                                                <FontAwesomeIcon
                                                    icon={getIconByAmenity(
                                                        item.name
                                                    )}
                                                    className="mr-1"
                                                />
                                            }
                                            {item.name}
                                        </p>
                                    ))}
                            </div>
                        )}
                        {data?.geoData &&
                            Array.isArray(data.geoData.en) &&
                            Array.isArray(data.geoData.ru) &&
                            data.geoData.en.length > 0 && (
                            <div>
                                {(i18n.language === 'ru'
                                    ? data.geoData.ru
                                    : data.geoData.en
                                )
                                    .filter(
                                        (item) => item.type === 'head'
                                    )[0]
                                    .geo_list.map((item) => (
                                        <p
                                            className="text-warning text-xs"
                                            key={item.idx}
                                        >
                                            <FontAwesomeIcon
                                                icon={getIconByGeoDataCategory(
                                                    ''
                                                )}
                                                className="mr-1"
                                            />
                                            {item.name} ~{' '}
                                            {item.distance_from_hotel}{' '}
                                            {item.measurement}
                                        </p>
                                    ))}
                            </div>
                        )}
                        {data?.hotel.rating && data.hotel.rating > 0 && (
                            <p className="flex items-center text-sm gap-1">
                                <Rating /> {data.hotel.rating}
                            </p>
                        )}
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <a
                            className="btn btn-primary btn-outline btn-md lg:btn-lg"
                            target={'_blank'}
                            href={linkOstrovok}
                            rel="noreferrer"
                        >
                            {'-> ' + t('BOOKING', 'Забронировать на') + ': '}
                        </a>
                        <a
                            target={'_blank'}
                            href={linkOstrovok}
                            rel="noreferrer"
                        >
                            <Ostrovok />
                        </a>
                    </div>
                </div>
                <div className="divider"></div>
                {data?.images.length && (
                    <ImagesGrid
                        onClick={toggleModal}
                        images={data.images}
                        name={hotelName}
                    />
                )}
            </div>
        </Base>
    );
};
