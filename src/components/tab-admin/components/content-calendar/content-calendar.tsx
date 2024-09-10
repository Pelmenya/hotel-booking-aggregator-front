import { useRouter } from 'next/router';
import { TabMenu } from '@/components/tab/components/tab-menu/tab-menu';
import { TabMenuLink } from '@/components/tab/components/tab-menu/components/tab-menu-link/tab-menu-link';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Calendar } from './components/calendar';


interface IFormInput {
    price: number;
    minStay: number;
    additionalFees: number;
    allowPets: boolean;
}

const DateSettings: React.FC = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            <div>
                <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                >
                    Цена
                </label>
                <input
                    type="number"
                    id="price"
                    {...register('price')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="minStay"
                    className="block text-sm font-medium text-gray-700"
                >
                    Минимальный срок проживания
                </label>
                <input
                    type="number"
                    id="minStay"
                    {...register('minStay')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="additionalFees"
                    className="block text-sm font-medium text-gray-700"
                >
                    Доплаты
                </label>
                <input
                    type="number"
                    id="additionalFees"
                    {...register('additionalFees')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="allowPets"
                    {...register('allowPets')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                    htmlFor="allowPets"
                    className="ml-2 block text-sm text-gray-900"
                >
                    Разрешить размещение животных
                </label>
            </div>
            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Сохранить
            </button>
        </form>
    );
};

export default DateSettings;

export const ContentCalendar = () => {
    const router = useRouter();
    const paths = router.asPath.split('/');
    const isEdit = paths.includes('edit');
    const isDelete = paths.includes('delete');

    return (
        <div className="grid grid-cols-5 grid-row-1 gap-4 h-full">
            <div className="col-span-1 border rounded-[0.375rem]">
                <TabMenu>
                    <TabMenuLink
                        href="/admin/hotels"
                        active={!isEdit && !isDelete}
                        text="Добавить"
                        icon="add"
                    />
                    <TabMenuLink
                        href="/admin/hotels/edit"
                        active={isEdit}
                        text="Редактировать"
                        icon="edit"
                    />
                    <TabMenuLink
                        href="/admin/hotels/delete"
                        active={isDelete}
                        text="Удалить"
                        disabled={true}
                        icon="delete"
                    />
                </TabMenu>
            </div>
            <div className="col-span-4 bg-base-100 px-4 py-4 rounded-md">
                <Calendar />
                <DateSettings />
            </div>
        </div>
    );
};
