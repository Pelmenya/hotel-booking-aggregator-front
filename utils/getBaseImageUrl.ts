export const getBaseImageUrl = (image : string) => image.replace(
    `${process.env.NEXT_PUBLIC_BASE_PICTURES_URL}`,
    ''
)