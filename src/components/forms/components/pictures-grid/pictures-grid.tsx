import { Toggle } from '@/components/toggle/toggle';
import { CheckBox } from '../check-box/check-box';
import { ChangeEvent } from 'react';
import { TPicture } from '@/types/t-picture';

export type TPicturesGridProps = {
    title?: string;
    pictures: TPicture[];
    handlerChecked?: (e: ChangeEvent<HTMLInputElement>) => void;
    handlerCheckedAll?: (isChecked: boolean) => void;
};

export const PicturesGrid = ({
    pictures,
    handlerChecked,
    handlerCheckedAll,
    title,
}: TPicturesGridProps) => (
    <>
        {title && (
            <div className="bg-neutral px-4 py-4 mb-2 rounded-md font-medium text-neutral-content text-xl font-bold tracking-tight flex justify-between">
                <h3>{title}</h3>
                {handlerCheckedAll && (
                    <Toggle onChange={handlerCheckedAll} text="Выбрать все" />
                )}
            </div>
        )}
        <div className="grid grid-cols-4 gap-2">
            {pictures.map((picture, idx) => (
                <div
                    key={String(idx) + picture}
                    className="bg-base-300 flex rounded-md px-2 py-2 items-center justify-center relative"
                >
                    <picture>
                        <img className="h-20" src={picture.url} alt="" />
                    </picture>
                    {handlerChecked ? (
                        <CheckBox
                            id={picture.url}
                            onChange={handlerChecked}
                            isChecked={picture.checked}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            ))}
        </div>
    </>
);
