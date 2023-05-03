import { DataJson } from '@/components/data-json/data-json';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';
import { Avatar } from './components/avatar/avatar';

export const ProfilePage = () => {
    const { user } = useAppSelector(getUserState);

    return (
        <div>
            <Avatar />
        </div>
    );
};
