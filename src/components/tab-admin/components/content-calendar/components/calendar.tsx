import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
        <div className="p-4">
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
            />
            <div>
                {selectedDate && (
                    <p>Выбранная дата: {format(selectedDate, 'dd/MM/yyyy')}</p>
                )}
            </div>
        </div>
    );
};