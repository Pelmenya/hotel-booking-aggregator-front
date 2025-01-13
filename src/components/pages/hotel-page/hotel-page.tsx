import { useMemo, useState } from 'react';
import { CarouselFullPicPreview } from '@/components/carousel-full-pic-preview/carousel-full-pic-preview';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { Modal } from '@/components/modal/modal';
import { THotelResData } from '@/types/t-hotel-res-data';
//import { Map } from '@/components/map/map';
import { TNullable } from '@/types/t-nullable';
import { useTranslation } from 'react-i18next';
import { Collapse } from '@/components/collapse/collapse';
import { Base } from '@/components/base/base';
import Rating from '../../../icons/hand-thumb-up.svg';



export type THotelPageProps = {
    data: TNullable<THotelResData>;
};
export const HotelPage = ({ data }: THotelPageProps) => {
    const { i18n } = useTranslation();
    const [isOpenModal, setIsOpenModal] = useState(false);
    //const descriptions: string[] = hotel.description.split('\r\n');

    const handlerToogleModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    const hotelName = useMemo(
        () =>
            `${data && data.hotel
                ? i18n.language === 'ru'
                    ? data?.hotel.name
                    : data?.hotel.name_en
                : ''}${data?.hotel.stars && data?.hotel.stars > 0 ?', '+ data?.hotel.stars+ '*': ''}`,
        [data, i18n.language]
    );

    const hotelAddress = useMemo(
        () =>
            data && data.locations
                ? i18n.language === 'ru'
                    ? data?.locations.ru.address
                    : data?.locations.en.address
                : '',
        [data, i18n.language]
    );
    
    const aboutsTitle = useMemo(
        () =>
            data && data.abouts
                ? i18n.language === 'ru'
                    ? data?.abouts.ru?.title || 'Описание'
                    : data?.abouts.en?.title || 'Description'
                : '',
        [data, i18n.language]
    );
    return (
        <>
            <div className="p-8">Breadcrumbs</div>
            <div className="flex flex-col gap-4">
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
                            <h1 className="font-black sm:text-xl lg:text-4xl">
                                {hotelName}
                            </h1>
                            <p className="text-primary">{hotelAddress}</p>
                            {data?.geoData && Array.isArray(data.geoData.ru) && Array.isArray(data.geoData.en) ? (
                                <div>
                                    {i18n.language === 'ru'
                                        ? data?.geoData.ru.filter((item) => item.type === 'head')[0].geo_list.map(
                                            (item) => (
                                                <p
                                                    className="text-warning text-xs"
                                                    key={item.idx}
                                                >
                                                    {item.name.trim()} ~{' '}
                                                    {item.distance_from_hotel}{' '}
                                                    {item.measurement}
                                                </p>
                                            )
                                        )
                                        : data?.geoData.en.filter((item) => item.type === 'head')[0].geo_list.map(
                                            (item) => (
                                                <p
                                                    className="text-warning text-xs"
                                                    key={item.idx}
                                                >
                                                    {item.name} ~{' '}
                                                    {item.distance_from_hotel}{' '}
                                                    {item.measurement}
                                                </p>
                                            )
                                        )}
                                </div>
                            ) : (
                                <></>
                            )}
                            <>{data?.hotel.rating && data?.hotel.rating > 0 ? <p className='flex items-center gap-1'><Rating /> {data?.hotel.rating}</p> : null}</>
                        </div>
                        <div className="divider"></div>
                        {data?.images.length ? (
                            <ImagesGrid
                                onClick={handlerToogleModal}
                                images={data.images}
                                name={hotelName}
                            />
                        ) : null}
                        {/*                 <article className="prose lg:prose-xl">
                    <h3 className="font-mono">Про отель</h3>
                    {descriptions.map((text, idx) => (
                        <p key={text + idx} className="font-mono">
                            {text}
                        </p>
                    ))}
                </article> */}
                    </div>
                    {/*             {hotel.coordinates.length ? (
                <Map coordinates={hotel.coordinates} />
            ) : (
                <></>
            )} */}
                </Base>
                <>
                    {data && data.abouts?.ru ? (
                        <Collapse title={aboutsTitle} type={'arrow'} fullView={true}>
                            <div>
                                {i18n.language === 'ru' &&
                                    data?.abouts?.ru?.descriptions?.map(
                                        (item) => (
                                            <>
                                                <h5 className="text-lg text-bold mb-2">
                                                    {item.title}
                                                </h5>
                                                <p
                                                    className="mb-2"
                                                    key={item.idx}
                                                >
                                                    {item.paragraph}
                                                </p>
                                            </>
                                        )
                                    )}
                                {i18n.language === 'en' &&
                                    data?.abouts?.en?.descriptions?.map(
                                        (item) => (
                                            <>
                                                <h5 className="text-lg text-bold mb-2">
                                                    {item.title}
                                                </h5>
                                                <p
                                                    className="mb-2"
                                                    key={item.idx}
                                                >
                                                    {item.paragraph}
                                                </p>
                                            </>
                                        )
                                    )}
                            </div>
                        </Collapse>
                    ) : null}
                </>
            </div>
        </>
    );
};
