import {
    faLandmark, faChurch, faFutbol, faDharmachakra, faShoppingBag,
    faTrain, faTree, faMusic, faBook, faCity, faSubway, faMountain,
    faBinoculars, faPaw, faMosque, faTheaterMasks, faAnchor, faSchool,
    faBriefcase, faUmbrellaBeach, faPlaneDeparture, faMonument,
    faSkiing, faMapMarkerAlt
}
    from '@fortawesome/free-solid-svg-icons';

const geoDataCatgoryMap = {
    'MUSEUM': faLandmark,
    'CHURCH': faChurch,
    'ARENAS_AND_STADIUMS': faFutbol,
    'BUDDIST_TEMPLE': faDharmachakra,
    'SHOPPING': faShoppingBag,
    'RAILWAY_STATION': faTrain,
    'PARK': faTree,
    'CONCERTS_AND_PERFORMANCES': faMusic,
    'LIBRARY': faBook,
    'CENTER': faCity,
    'SUBWAY': faSubway,
    'CABLEWAY': faMountain,
    'VIEWPOINT': faBinoculars,
    'ZOOS_AND_AQUARIUMS': faPaw,
    'MOSQUE': faMosque,
    'THEATER': faTheaterMasks,
    'HARBOR': faAnchor,
    'EDUCATIONAL_OBJECTS': faSchool,
    'BUSINESS_CENTER': faBriefcase,
    'BEACH': faUmbrellaBeach,
    'AIRPORT': faPlaneDeparture,
    'HISTORICAL_POI': faMonument,
    'SKI': faSkiing,
    default: faMapMarkerAlt, // иконка по умолчанию
}


export const getIconByGeoDataCategory = (geoDataCatgory: string) => {
    return geoDataCatgoryMap[geoDataCatgory] ||  geoDataCatgoryMap.default;
};
