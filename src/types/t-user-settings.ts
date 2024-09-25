import { TCurrency } from './t-currency';
import { TLanguage } from './t-language';
import { TTheme } from './t-theme';

export type TUserSettings = {
    theme: TTheme;
    language: TLanguage;
    currency: TCurrency;
    phoneChanel: boolean;
    emailChanel: boolean;
    pushChanel: boolean;
};