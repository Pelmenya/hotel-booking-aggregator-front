import { THotel } from './t-hotel';

export type THotelRoom = {
    id: string;
    hotel: THotel;
    title: string;
    description: string;
    images: string[];
    createAt: Date;
    updateAt: Date;
    isEnabled: boolean;
}