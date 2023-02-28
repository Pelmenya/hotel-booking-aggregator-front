import Link from 'next/link';

export interface IFormLink {
    label?: string;
    href: string;
    text: string;
}

export const FormLink = ({ label = '', href, text }: IFormLink) => (
    <div className="flex items-center justify-center w-full">
        <span>{label}</span>
        <Link
            href={href}
            className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
        >
            {text}
        </Link>
    </div>
);
