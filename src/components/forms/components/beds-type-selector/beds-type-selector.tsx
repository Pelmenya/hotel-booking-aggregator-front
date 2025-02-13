import React, { useState, useCallback } from 'react';
import { ListBox } from '@/components/list-box/list-box';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import {
    addBedSelection,
    removeBedSelection,
    updateBedSelection,
} from '@/redux/slices/create-hotel-slice';
import { TAppState } from '@/types/t-app-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { bedTypes } from './constants';
import _ from 'lodash';

export const BedsTypeSelector = () => {
    const dispatch = useAppDispatch();
    const bedSelections = useAppSelector(
        (state: TAppState) => state.createHotel.bedSelections
    );

    const totalBeds = useAppSelector(
        (state: TAppState) => state.createHotel.totalBeds
    );

    const [newBedType, setNewBedType] = useState<string | null>(null);

    const handleSelectExisting = useCallback(
        (selected: string | null, bed: { id: string; type: string }) => {
            if (selected && selected !== bed.type) {
                dispatch(
                    updateBedSelection({ id: bed.id, type: selected, count: 1 })
                );
                dispatch(removeBedSelection(bed.id));
            }
        },
        [dispatch]
    );

    const handleNewTypeChange = useCallback((type: string | null) => {
        setNewBedType(type);
    }, []);

    const handleCountChange = useCallback(
        (
            bed: { id: string; type: string; count: number },
            newCount: number
        ) => {
            if (newCount > 0) {
                dispatch(
                    updateBedSelection({
                        id: bed.id,
                        type: bed.type,
                        count: newCount,
                    })
                );
            } else {
                dispatch(removeBedSelection(bed.id));
            }
        },
        [dispatch]
    );

    const addNewBedSelection = useCallback(() => {
        if (
            newBedType &&
            !bedSelections.some((bed) => bed.type === newBedType)
        ) {
            dispatch(
                addBedSelection({
                    id: _.uniqueId(),
                    type: newBedType,
                    count: 1,
                })
            );
            setNewBedType(null);
        }
    }, [dispatch, newBedType, bedSelections]);

    const availableBedTypes = bedTypes.filter(
        (b) => !bedSelections.some((bed) => bed.type === b.type)
    );

    return (
        <div className="grid grid-cols-12 gap-4">
            {bedSelections.map((bed) => (
                <div
                    key={bed.id}
                    className="col-span-12 grid grid-cols-12 gap-2"
                >
                    <div className="col-span-10">
                        <ListBox
                            id={`bedType-${bed.id}`}
                            label="Выберите тип кровати"
                            items={bedTypes.map((b) => b.type)}
                            handlerSetItem={(value) =>
                                handleSelectExisting(value, bed)
                            }
                            activeIdx={bedTypes.findIndex(
                                (b) => b.type === bed.type
                            )}
                            tooltips={bedTypes.map(
                                (b) =>
                                    `Размер: ${b.size}, Кол-во человек: ${b.persons}`
                            )}
                        />
                    </div>
                    <div className="col-span-2 flex gap-2 items-center">
                        <button
                            className="btn btn-circle btn-sm btn-outline btn-primary"
                            type="button"
                            onClick={() =>
                                handleCountChange(bed, bed.count - 1)
                            }
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span>{bed.count}</span>
                        <button
                            className="btn btn-circle btn-sm btn-outline btn-primary"
                            type="button"
                            onClick={() =>
                                handleCountChange(bed, bed.count + 1)
                            }
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            ))}

            <div className="col-span-11">
                <ListBox
                    id="newBedType"
                    label="Выберите тип кровати"
                    items={availableBedTypes.map((b) => b.type)}
                    handlerSetItem={handleNewTypeChange}
                    activeIdx={
                        newBedType
                            ? availableBedTypes.findIndex(
                                (b) => b.type === newBedType
                            )
                            : null
                    }
                    tooltips={availableBedTypes.map(
                        (b) => `Размер: ${b.size}, Кол-во человек: ${b.persons}`
                    )}
                />
            </div>
            {newBedType && (
                <div className="col-span-1 flex items-center justify-end">
                    <button
                        className="btn btn-circle btn-sm btn-outline btn-primary"
                        type="button"
                        onClick={addNewBedSelection}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            )}

            <div className="col-span-12">
                Спальных мест: <span>{totalBeds}</span>
            </div>
        </div>
    );
};
