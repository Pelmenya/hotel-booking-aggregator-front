export const DataJson = ({ data }: { data: any }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
);
