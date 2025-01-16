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

export type TGeoCodeData = {
    areas: TAreas;
    codes: TCodes;
    country: TCountry;
    cover: TCover[];
    fields: TField[];
    geo_data: TGeoDataLocation;
    post_office: TPostOffice;
    stations: TStation[];
    time_zone: TTimeZone;
    pretty: string;
    quality: TQuality;
};

type TAreas = {
    admin_area: TAdminArea;
    admin_okrug: TAdminOkrug;
    ring_road: TRingRoad;
};

type TAdminArea = {
    name: string;
    type: string;
};

type TAdminOkrug = {
    name: string;
    type: string;
};

type TRingRoad = {
    in_ring: boolean;
    name: string;
    short: string;
};

type TCodes = {
    abr_actual_code: string;
    abr_detected_code: string;
    fias_actual_code: string;
    fias_house: string;
    fias_house_precise: boolean;
    fias_object: string;
    fias_object_level: string;
    gar_Region: string;
    gar_house: string;
    gar_object: string;
    ifns_fl: string;
    ifns_ul: string;
    kladr_actual_code: string;
    okato: string;
    oktmo: string;
    sign: string;
};

type TCountry = {
    code: string;
    name: string;
    sign: string;
};

type TCover = {
    in?: string;
    out?: string;
};

type TField = {
    c?: string;
    cover?: string;
    level: string;
    name?: string;
    ns?: number;
    ts?: number;
    type?: string;
};

type TGeoDataLocation = {
    house_level: string;
    max: TCoordinates;
    mid: TCoordinates;
    min: TCoordinates;
    object_level: string;
    rel: number;
};

type TCoordinates = {
    lat: number;
    lon: number;
};

type TPostOffice = {
    dist: number;
    lat: number;
    lon: number;
    pretty: string;
    sign: string;
};

type TStation = {
    dist: number;
    lat: number;
    line: string;
    lon: number;
    name: string;
    net: string;
    type: string;
};

type TTimeZone = {
    msk_zone: string;
    name: string;
    utc_zone: string;
};

type TQuality = {
    canonic_fields: number;
    detected_fields: number;
    precision: number;
    recall: number;
    verified_numeric_fields: number;
};


type TLocation = {
    id: string;
    language: TLanguage;
    address: string;
    geocode_data: TGeoCodeData;
}

export type TAmenity = {
    idx: number;
    name: string;
    paid?: boolean;
};

export type TAmenities = {
    id: string;
    title: string;
    language: TLanguage;
    amenities_list: TAmenity[];
    type: TCategory;
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

export type TDescription = {
    idx: number;
    title: string;
    paragraph: string;
};

export type TAbouts = {
    id: string;
    title: string;
    language: TLanguage;
    descriptions: TDescription[];
}

export type TPolicyItem = {
    id: number;
    in: string;
    out: string;
    name: string;
}

export type TPolicy = {
    id: string;
    title: string;
    language: TLanguage;
    policy: TPolicyItem[];
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
    amenities: { ru: TAmenities | TAmenities[]; en: TAmenities | TAmenities[] };
    geoData: { ru: TGeoData | TGeoData[]; en: TGeoData | TGeoData[] };
    images: TImage[];
    abouts: { ru: TAbouts; en: TAbouts };
    policies: { ru: TPolicy; en: TPolicy }
};