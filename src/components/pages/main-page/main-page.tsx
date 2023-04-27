import { useGetCommonHotelsQuery } from '@/redux/api/common';
import { List } from '../../list/list';

export const MainPage = () => {
    const { data } = useGetCommonHotelsQuery('');
    return <> {data ? <List items={data} href='/hotels'/> : null}</>;
};
