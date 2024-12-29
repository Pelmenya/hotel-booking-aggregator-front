import { TLanguage } from './t-language';

export type THotel = {
    id: string;
    title: string;
    description: string;
    images: string[];
    coordinates: number[];
    createAt?: string;
    updateAt?: string;
}

export type TImageSize = 'large' | 'medium' | 'main' | 'small' | 'thumbnail';
export type TImageWidth = 1024 | 828 | 640 | 220 | 240;
export type TImageHeight = 768 | 560 | 400 | 220 | 240;
export type TCategory = 'main' | 'additional' | 'head';


export type TImage = {
    id: string;
    type: TCategory;
    path: string;
    size?: TImageSize
}

type TLocation = {
    id: string;
    language: TLanguage;
    address: string;
}

export type TAmenity = {
    idx: number;
    name: string;
    paid?: boolean;
};

export type TAmenities = {
    id: string;
    language: TLanguage;
    amenities_list: TAmenity[];
}

export type THotelResData = {
    hotel: {
        id: string;
        name: string;
        name_en: string;
        hotel_link_ostrovok: string;
        rating?: number;
        stars?: number;
    };
    locations: { ru: TLocation; en: TLocation };
    amenities: { ru: TAmenities; en: TAmenities };
    images: TImage[];
};