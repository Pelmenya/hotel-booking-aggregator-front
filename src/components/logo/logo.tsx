import Link from 'next/link';

export const Logo = () => {
    return (
        <Link href='/' className="text-white uppercase font-bold text-lg bg-primary p-2 rounded-lg">
            {process.env.NEXT_PUBLIC_SITE_URL?.split('//')[1]}
        </Link>
    );
};
