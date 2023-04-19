export const DataJson = ({ data }: any) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
);
