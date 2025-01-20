export const transformCoordinates = (coordinates: string): number[] =>
    [Number(coordinates.split(',')[0]), Number(coordinates.split(',')[1])];
