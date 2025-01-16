import { Collapse } from '@/components/collapse/collapse';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { THotelPageProps } from '../hotel-page';

export const HotelPolicies = ({ data }: THotelPageProps) => {
    const { i18n } = useTranslation('');

    const policyTitle = useMemo(() => {
        if (!data || !data.policies) return '';

        return i18n.language === 'ru'
            ? data.policies.ru.title
            : data.policies.en.title;
    }, [data, i18n.language]);

    return (
        <>
            {data && data.policies.ru ? (
                <Collapse title={policyTitle} type={'arrow'} fullView={true}>
                    <>
                        {i18n.language === 'ru' &&
                            data?.policies?.ru?.policy.map((item) => (
                                <div key={item.id}>
                                    <h5 className="text-lg text-bold mb-2">
                                        {item.name}
                                    </h5>
                                    <p className="mb-2">
                                        <span>{'Заезд: '}</span>
                                        {item.in.toLowerCase()}
                                    </p>
                                    <p className="mb-2">
                                        <span>{'Выезд: '}</span>
                                        {item.out.toLowerCase()}
                                    </p>
                                </div>
                            ))}
                        {i18n.language === 'en' &&
                            data?.policies?.en?.policy.map((item) => (
                                <div key={item.id}>
                                    <h5 className="text-lg text-bold mb-2">
                                        {item.name}
                                    </h5>
                                    <p className="mb-2">
                                        <span>{'Check-in: '}</span>
                                        {item.in.toLowerCase()}
                                    </p>
                                    <p className="mb-2">
                                        <span>{'Check-out: '}</span>
                                        {item.out.toLowerCase()}
                                    </p>
                                </div>
                            ))}
                    </>
                </Collapse>
            ) : null}
        </>
    );
};
