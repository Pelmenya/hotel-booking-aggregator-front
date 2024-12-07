import { getYear } from 'utils/getYear';
import { Logo } from '../logo/logo';
import Link from 'next/link';
import VKIcon from '@/icons/social/vk.svg';
import TGIcon from '@/icons/social/tg.svg';
import GitHubIcon from '@/icons/social/git-hub.svg';
import WhatsAppIcon from '@/icons/social/whats-app.svg';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation('footer'); 
    const currentYear = getYear();


    return (
        <footer className="footer mt-8 p-10 bg-neutral text-neutral-content">
            <div className="footer mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <aside>
                    <Logo text={true}/>
                    <p>
                        © 2023{' '}
                        {currentYear > 2023 && <span>- {currentYear}</span>}{' '}
                        {t('owner', 'Дмитрий Ляпин')}
                    </p>
                </aside>
                <nav>
                    <header className="footer-title">{t('information','Информация')}</header>
                    <Link href="/privacy-policy" className="link link-hover">
                        {t('privacyPolicy', 'Политика конфиденциальности')}
                    </Link>
                </nav>
                <nav>
                    <header className="footer-title">{t('contacts','Контакты')}</header>
                    <a href="tel:+79166198852" className="link link-hover">
                        {t('phone','Тел.: +7(916)-619-88-52')}
                    </a>
                    <a href="mailto:lyapindm@yandex.ru" className="link link-hover">
                        {t('email','Email: lyapindm@yandex.ru')}
                    </a>
                </nav>
                <nav>
                    <header className="footer-title">{t('social','Соцсети')}</header>
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
