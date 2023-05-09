export const DataJson = ({ data }: { data: any }) => (
    <pre className="text-base-content">{JSON.stringify(data, null, 2)}</pre>
);
