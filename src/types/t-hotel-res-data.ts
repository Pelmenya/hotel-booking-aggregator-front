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

export type TImage = {
    id: string;
    alt: string;
    path: string;
    size?: TImageSize
}

export type THotelResData = {
    id: string;
    name: string;
    name_en: string;
    hotel_link_ostrovok: string;
    rating?: number;
    stars?: number;
    locations: { ru: string; en: string };
    images: TImage[];
};