import { yupResolver } from '@hookform/resolvers/yup';
import { FormLink } from '../components/form-link/form-link';
import { Input } from '../components/input/input';
import { useForm } from 'react-hook-form';
import { schemaLoginForm } from '../schemas/yup.schemas';
import { usePostLoginMutation } from '@/redux/api/auth-api';
import { TError } from '@/types/t-error';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user-slice';
import { useGetProfileMutation, useGetProfileSettingsMutation } from '@/redux/api/common-api';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { setUserSettings } from '@/redux/slices/user-settings-slice';

export const LoginForm = () => {
    const { t, i18n } = useTranslation('form');
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [postLogin, { isLoading, isError, error }] = usePostLoginMutation();
    const [getProfile] = useGetProfileMutation();
    const [getProfileSettings] = useGetProfileSettingsMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaLoginForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (dto: any) => {
        if (dto) {
            try {
                const postUser = await postLogin(dto).unwrap();
                if (postUser) {
                    router.push('/profile');
                    dispatch(setUser(await getProfile('').unwrap()));
                    const userSettings = await getProfileSettings('').unwrap();
                    localStorage.setItem('theme', userSettings.theme || 'light');
                    dispatch(setUserSettings(userSettings));
                    i18n.changeLanguage(userSettings.language);
                }
   
            } catch(e) {
                console.log(e)
            }
        }
    };

    return (
        <FormWrapper
            title={t('TITLE_FORM_LOGIN', 'Вход')}
            name="login"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="email"
                id="UserEmail"
                placeholder="Email"
                label={t('LABEL_INPUT_EMAIL', 'Почта')}
                control={control}
                error={!!errors.email}
                name="email"
            />
            <Input
                type="password"
                id="UserPassword"
                placeholder="Password"
                label={t('LABEL_INPUT_PASSWORD', 'Пароль')}
                control={control}
                error={!!errors.password}
                name="password"
                autoComplete="new-password"
            />
            <SubmitBtn
                text={t('CAPTION_SUBMIT_BTN_ENTER', 'Войти')}
                error={error as TError}
                isError={isError}
                isLoading={isLoading}
            />

            <FormLink
                label={t('LABEL_FORM_LINK_NEW_USER','Вы — новый пользователь?')}
                href="/client/register"
                text={t('ACTION_FORM_LINK_NEW_USER','Зарегистрироваться')}
            />
        </FormWrapper>
    );
};
