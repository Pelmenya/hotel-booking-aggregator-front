import { useMemo, useState } from 'react';
import { CarouselFullPicPreview } from '@/components/carousel-full-pic-preview/carousel-full-pic-preview';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { Modal } from '@/components/modal/modal';
import { THotelResData } from '@/types/t-hotel-res-data';
//import { Map } from '@/components/map/map';
import { TNullable } from '@/types/t-nullable';
import { useTranslation } from 'react-i18next';

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

    const hotelName = useMemo(() => 
        data ? i18n.language === 'ru'? data?.hotel.name : data?.hotel.name_en : ''
    ,[data, i18n])

    return (
        <>
            {data?.images.length ? (
                <Modal isOpen={isOpenModal} handlerClose={handlerToogleModal}>
                    <CarouselFullPicPreview
                        images={data?.images || []}
                        name={hotelName}
                    />
                </Modal>
            ) : (
                null
            )}
            <div className="flex flex-col gap-16 py-16">
                <h1 className="font-black text-5xl">{i18n.language === 'ru'
                    ? data?.hotel.name
                    : data?.hotel.name_en}</h1>
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
        </>
    );
};
