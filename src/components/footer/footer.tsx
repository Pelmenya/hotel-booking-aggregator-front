import { getYear } from 'utils/getYear';
import { Logo } from '../logo/logo';
import Link from 'next/link';
import VKIcon from '@/icons/social/vk.svg';
import TGIcon from '@/icons/social/tg.svg';
import GitHubIcon from '@/icons/social/git-hub.svg';
import WhatsAppIcon from '@/icons/social/whats-app.svg';

export const Footer = () => {
    const currentYear = getYear();

    return (
        <footer className="footer mt-8 p-10 bg-neutral text-neutral-content">
            <div className="footer mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <aside>
                    <Logo />
                    <p>
                        © 2023{' '}
                        {currentYear > 2023 && <span>- {currentYear}</span>}{' '}
                        Дмитрий Ляпин
                    </p>
                </aside>
                <nav>
                    <header className="footer-title">Информация</header>
                    <Link href="/privacy-policy" className="link link-hover">
                        Политика конфиденциальности
                    </Link>
                </nav>
                <nav>
                    <header className="footer-title">Контакты</header>
                    <a href="tel:+79166198852" className="link link-hover">
                        Тел.: +7(916)-619-88-52
                    </a>
                    <a href="mailto:lyapindm@yandex.ru" className="link link-hover">
                        Email: lyapindm@yandex.ru
                    </a>
                </nav>
                <nav>
                    <header className="footer-title">Соцсети</header>
                    <div className="grid grid-flow-col gap-4">
                        <a
                            href="https://vk.com/lyapindm"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <VKIcon />
                        </a>
                        <a
                            href="https://t.me/dmitry_lyapin"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <TGIcon />
                        </a>
                        <a
                            href="https://github.com/Pelmenya"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href="https://wa.me/+79166198852"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <WhatsAppIcon />
                        </a>
                    </div>
                </nav>
            </div>
        </footer>
    );
};
