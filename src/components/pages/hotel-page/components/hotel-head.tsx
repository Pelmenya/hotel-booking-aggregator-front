import { useMemo, useState } from 'react';
import { Base } from '@/components/base/base'
import { CarouselFullPicPreview } from '@/components/carousel-full-pic-preview/carousel-full-pic-preview';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { Modal } from '@/components/modal/modal';
import { useTranslation } from 'react-i18next';
import { THotelPageProps } from '../hotel-page'
import Rating from '../../../../icons/hand-thumb-up.svg';

export type THotelHeadProps = THotelPageProps & {
    hotelAddress: string;
}

export const HotelHead = ({ data, hotelAddress }: THotelHeadProps) => {
    const { i18n } = useTranslation();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handlerToogleModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    const hotelName = useMemo(
        () =>
            `${
                data && data.hotel
                    ? i18n.language === 'ru'
                        ? data?.hotel.name
                        : data?.hotel.name_en
                    : ''
            }${
                data?.hotel.stars && data?.hotel.stars > 0
                    ? ', ' + data?.hotel.stars + '*'
                    : ''
            }`,
        [data, i18n.language]
    );

    return (
        <Base>
            {data?.images.length ? (
                <Modal
                    isOpen={isOpenModal}
                    handlerClose={handlerToogleModal}
                >
                    <CarouselFullPicPreview
                        images={data?.images || []}
                        name={hotelName}
                    />
                </Modal>
            ) : null}
            <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2">
                    <h1 className="font-black text-2xl md:text-2xl lg:text-4xl">
                        {hotelName}
                    </h1>
                    <p className="text-primary">{hotelAddress}</p>
                    {data?.amenities && Array.isArray(data.amenities.ru) && Array.isArray(data.amenities.en) && data.amenities.en.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
                            {i18n.language === 'ru'
                                ? data?.amenities.ru
                                    .filter(
                                        (item) => item.type === 'main'
                                    )[0]
                                    .amenities_list.map((item) => (
                                        <p
                                            className="badge badge-sm md:badge-md badge-ghost"
                                            key={item.idx}
                                        >
                                            {item.name}
                                        </p>
                                    ))
                                : data?.amenities.en
                                    .filter(
                                        (item) => item.type === 'main'
                                    )[0]
                                    .amenities_list.map((item) => (
                                        <p
                                            className="badge badge-sm md:badge-md badge-ghost"
                                            key={item.idx}
                                        >
                                            {item.name}
                                        </p>
                                    ))}
                        </div>
                    ) : null}
                    {data?.geoData && Array.isArray(data.geoData.ru) && Array.isArray(data.geoData.en) && data.geoData.en.length > 0 ? (
                        <div>
                            {i18n.language === 'ru'
                                ? data?.geoData.ru
                                    .filter(
                                        (item) => item.type === 'head'
                                    )[0]
                                    .geo_list.map((item) => (
                                        <p
                                            className="text-warning text-xs"
                                            key={item.idx}
                                        >
                                            {item.name.trim()} ~{' '}
                                            {item.distance_from_hotel}{' '}
                                            {item.measurement}
                                        </p>
                                    ))
                                : data?.geoData.en
                                    .filter(
                                        (item) => item.type === 'head'
                                    )[0]
                                    .geo_list.map((item) => (
                                        <p
                                            className="text-warning text-xs"
                                            key={item.idx}
                                        >
                                            {item.name} ~{' '}
                                            {item.distance_from_hotel}{' '}
                                            {item.measurement}
                                        </p>
                                    ))}
                        </div>
                    ) : (
                        <></>
                    )}
                    <>
                        {data?.hotel.rating && data?.hotel.rating > 0 ? (
                            <p className="flex items-center gap-1">
                                <Rating /> {data?.hotel.rating}
                            </p>
                        ) : null}
                    </>
                </div>
                <div className="divider"></div>
                {data?.images.length ? (
                    <ImagesGrid
                        onClick={handlerToogleModal}
                        images={data.images}
                        name={hotelName}
                    />
                ) : null}
            </div>
        </Base>
    )
}