import { useMemo, useState } from 'react';
import { CarouselFullPicPreview } from '@/components/carousel-full-pic-preview/carousel-full-pic-preview';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { Modal } from '@/components/modal/modal';
import { THotelResData } from '@/types/t-hotel-res-data';
//import { Map } from '@/components/map/map';
import { TNullable } from '@/types/t-nullable';
import { useTranslation } from 'react-i18next';
//import { Collapse } from '@/components/collapse/collapse';
import { Base } from '@/components/base/base';

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
            data
                ? i18n.language === 'ru'
                    ? data?.hotel.name
                    : data?.hotel.name_en
                : '',
        [data, i18n.language]
    );

    const hotelAddress = useMemo(
        () =>
            data
                ? i18n.language === 'ru'
                    ? data?.locations.ru.address
                    : data?.locations.en.address
                : '',
        [data, i18n.language]
    );

    return (
        <>
            <div className="p-8">Breadcrumbs</div>
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
                <div className="flex flex-col gap-16">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-black sm:text-xl lg:text-3xl">
                            {hotelName}
                        </h1>
                        <p className="text-primary">{hotelAddress}</p>
                    </div>
                    {/*                     <Collapse
                        head={'How do I create an account?'}
                        body={
                            'Click the "Sign Up" button in the top right corner and follow the registration process.'
                        }
                        type="default"
                    /> */}
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
        </>
    );
};
