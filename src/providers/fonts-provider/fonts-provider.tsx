import { Inter, Roboto_Mono } from '@next/font/google';

export interface IFontsProviderProps {
    children: JSX.Element;
}

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    display: 'swap',
});

export const FontsProvider = ({ children }: IFontsProviderProps) => (
    <div
        className={`${inter.variable} font-sans ${roboto_mono.variable} font-mono`}
    >
        {/* Для createPortal */}
        <style jsx global>{`
            html {
                font-family: ${inter.style.fontFamily};
            }
        `}</style>
        {children}
    </div>
);
