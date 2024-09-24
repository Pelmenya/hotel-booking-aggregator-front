import { TCurrency } from './t-currency';
import { TLanguage } from './t-language';
import { TNullable } from './t-nullable';
import { TTheme } from './t-theme';

export type TUserSettings = {
    id: TNullable<number>;
    userId: TNullable<string>;
    theme: TTheme;
    language: TLanguage;
    currency: TCurrency;
    phoneChanel: boolean;
    emailChanel: boolean;
    pushChanel: boolean;
};
