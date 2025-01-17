export const DataJson = ({ data }: { data: any }) => { 
    const isDev = process.env.NODE_ENV !== 'production';
    
    return isDev ? <pre className="text-base-content">{JSON.stringify(data, null, 2)}</pre> : null
};
