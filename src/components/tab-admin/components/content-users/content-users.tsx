import { useGetAdminUsersQuery } from '@/redux/api/admin';
import { getImageUrl } from 'utils/getImageUrl';

export const ContentUsers = () => {
    const { data } = useGetAdminUsersQuery('');

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Аватар</th>
                        <th>Имя</th>
                        <th>Почта</th>
                        <th>Телефон</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((user) => (
                            <tr key={user?.email}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <picture>
                                                    <img
                                                        src={
                                                            user?.avatars
                                                                ? getImageUrl(
                                                                    user
                                                                        ?.avatars[0]
                                                                )
                                                                : ''
                                                        }
                                                        alt={user?.name}
                                                    />
                                                </picture>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user?.name}</td>
                                <td>
                                    {user?.email}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        {user?.emailIsConfirm
                                            ? 'подтвержден'
                                            : 'не подтвержден'}
                                    </span>
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">
                                        {user?.contactPhone
                                            ? user?.contactPhone
                                            : 'нет номера'}
                                    </button>
                                </th>
                            </tr>
                        ))}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Аватар</th>
                        <th>Имя</th>
                        <th>Почта</th>
                        <th>Телефон</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};
