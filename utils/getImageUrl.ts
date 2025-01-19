export const getImageUrl = (image: string, store: 's3'|'server' = 's3'): string => 
    store === 's3'? `${process.env.NEXT_PUBLIC_BASE_PICTURES_URL}${image}`:`${process.env.NEXT_PUBLIC_BASE_PICTURES_URL_MONGO}${image}`;