import { HotelForm } from '@/components/forms/hotel-form/hotel-form';

export const ContentHotels = () => {
    return (
        <div className="grid grid-cols-5 grid-row-1 gap-4 h-full">
            <div className="col-span-1">
                <div className="btn-group btn-group-vertical bg-base-100 px-1 py-1 rounded-[0.375rem] w-full">
                    <button className="btn btn-active">Добавить</button>
                    <button className="btn">Редактировать</button>
                    <button className="btn">Удалить</button>
                </div>
            </div>
            <div className="col-span-4 bg-base-100 px-4 py-4 rounded-[0.375rem]"><HotelForm /></div>
        </div>
    );
};
