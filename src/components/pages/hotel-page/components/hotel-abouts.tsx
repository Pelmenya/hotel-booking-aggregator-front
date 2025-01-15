import { Collapse } from '@/components/collapse/collapse';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { THotelPageProps } from '../hotel-page';

export const HotelAbouts = ({ data }: THotelPageProps) => {
    const { i18n } = useTranslation();

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
            {data && data.abouts?.ru ? (
                <Collapse title={aboutsTitle} type={'arrow'} fullView={true}>
                    <article>
                        {i18n.language === 'ru' &&
                            data?.abouts?.ru?.descriptions?.map((item) => (
                                <div key={item.idx}>
                                    <h5 className="text-lg text-bold mb-2">
                                        {item.title}
                                    </h5>
                                    <p className="mb-2" key={item.idx}>
                                        {item.paragraph}
                                    </p>
                                </div>
                            ))}
                        {i18n.language === 'en' &&
                            data?.abouts?.en?.descriptions?.map((item) => (
                                <div key={item.idx}>
                                    <h5 className="text-lg text-bold mb-2">
                                        {item.title}
                                    </h5>
                                    <p className="mb-2">{item.paragraph}</p>
                                </div>
                            ))}
                    </article>
                </Collapse>
            ) : null}
        </>
    );
};
