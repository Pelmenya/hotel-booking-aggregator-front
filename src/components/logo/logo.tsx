import Link from 'next/link';
import cn from 'classnames';

export type TLogoProps = {
    text?: boolean;
};

export const Logo = ({ text = false }: TLogoProps) => {
    return (
        <Link
            href="/"
            className="text-white uppercase font-bold text-lg bg-primary p-2 rounded-lg"
        >
            <p
                className={cn({
                    ['hidden sm:block']: !text,
                    ['block']: !text,
                })}
            >
                {process.env.NEXT_PUBLIC_SITE_URL?.split('//')[1]}
            </p>
            <div
                className={cn({
                    ['block sm:hidden h-6 w-6']: !text,
                    ['hidden']: text,
                })}
            >
                <svg
                    fill="currentColor"
                    width="137"
                    height="134"
                    viewBox="0 0 137 134"
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M53.5663 34.6963C30.6231 39.316 13.2852 59.5908 13.2852 83.8273C13.2852 111.464 35.8162 133.959 63.5267 133.959C91.2372 133.959 113.755 111.464 113.755 83.8273C113.755 70.681 108.658 58.7135 100.332 49.7619C103.533 55.2178 105.388 61.5648 105.388 68.3505C105.388 88.6801 88.8742 105.158 68.5001 105.158C48.1259 105.158 31.6123 88.6801 31.6123 68.3505C31.6123 53.3261 40.6384 40.4127 53.5663 34.6963Z"></path>
                    <path d="M68.5 0C30.6643 0 0 30.5972 0 68.3503C0 84.3343 5.50913 99.0298 14.7276 110.668C10.3039 102.704 7.78971 93.5601 7.78971 83.8271C7.78971 53.1613 32.7937 28.212 63.5267 28.212C94.2596 28.212 119.25 53.1613 119.25 83.8271C119.25 105.911 106.281 125.021 87.5415 134C116.104 125.761 136.986 99.4959 136.986 68.3503C137 30.5972 106.336 0 68.5 0Z"></path>
                </svg>
            </div>
        </Link>
    );
};
