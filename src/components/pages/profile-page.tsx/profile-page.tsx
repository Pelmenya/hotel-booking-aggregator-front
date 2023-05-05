import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';
import { Avatar } from './components/avatar/avatar';
import { getImageUrl } from 'utils/getImageUrl';

export const ProfilePage = () => {
    const { user } = useAppSelector(getUserState);

    return (
        <div className='py-12 pl-5 w-full flex flex-col items-center'>
            <Avatar picture={user?.avatars ? getImageUrl(user?.avatars[0]): null}/>
        </div>
    );
};
