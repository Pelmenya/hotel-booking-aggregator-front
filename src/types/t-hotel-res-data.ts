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

export type TDistanceMeasurement = 'km' | 'm' | 'км' | 'м';

export type TGeoDataListItem = {
    idx: number;
    name: string;
    category: string;
    distance_from_hotel: number;
    measurement: TDistanceMeasurement;
    geo?: string;
};

export type TGeoDataList = TGeoDataListItem[];

export type TGeoData = {
    id: string,
    title: string,
    type: TCategory,
    language: TLanguage,
    geo_list: TGeoDataList,
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
    geoData: { ru: TGeoData; en: TGeoData };
    images: TImage[];
};