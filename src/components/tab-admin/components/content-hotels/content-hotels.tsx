import { HotelForm } from '@/components/forms/hotel-form/hotel-form';

export const ContentHotels = () => {
    return (
        <div className="grid grid-cols-5 grid-row-1 gap-4 h-full">
            <div className="col-span-1">
                <div className="btn-group btn-group-vertical bg-base-100 px-2 py-2 rounded-md w-full">
                    <button className="btn btn-active">Добавить</button>
                    <button className="btn">Редактировать</button>
                    <button className="btn">Удалить</button>
                </div>
            </div>
            <div className="col-span-4 bg-base-100 px-4 py-4 rounded-md"><HotelForm /></div>
        </div>
    );
};
