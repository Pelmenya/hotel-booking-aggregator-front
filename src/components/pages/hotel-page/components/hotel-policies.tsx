import { Collapse } from '@/components/collapse/collapse';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { THotelPageProps } from '../hotel-page';

export const HotelPolicies = ({ data }: THotelPageProps) => {
    const { i18n }  = useTranslation('');
    
    const policyTitle = useMemo(() => {
        if (!data || !data.policies) return '';
        
        return i18n.language === 'ru' ? data.policies.ru.title : data.policies.en.title;
    }, [data, i18n.language]);

    return (
        <>
            { data && data.policies.ru ? (
                <Collapse title={policyTitle} type={'arrow'} fullView={true}>
                    <></>
                </Collapse>

            ) : 
                null
            }
        </>
    )
};
