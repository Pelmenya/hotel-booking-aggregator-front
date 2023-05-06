import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';
import { Avatar } from './components/avatar/avatar';
import { getImageUrl } from 'utils/getImageUrl';
import { UpdateUserForm } from '@/components/forms/update-user-form/update-user-form';

export const ProfilePage = () => {
    const { user } = useAppSelector(getUserState);

    return (
        <div className='py-12 w-full flex flex-col items-center'>
            <Avatar picture={user?.avatars?.length ? getImageUrl(user?.avatars[0]): null}/>
            <UpdateUserForm />
        </div>
    );
};
