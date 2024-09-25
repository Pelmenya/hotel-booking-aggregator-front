import { FormLink } from '../components/form-link/form-link';
import { Input } from '../components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegisterForm } from '../schemas/yup.schemas';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ListBox } from '../../list-box/list-box';
import { roles } from '../../list-box/constants';
import { useCallback } from 'react';
import { TRole } from '@/types/t-role';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { usePostAdminUsersMutation } from '@/redux/api/admin-api';
import { usePostRegisterMutation } from '@/redux/api/client-api';
import { TError } from '@/types/t-error';
import { usePostLoginMutation } from '@/redux/api/auth-api';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user-slice';
import { useGetProfileMutation, usePostUserSettingsMutation } from '@/redux/api/common-api';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { useTranslation } from 'react-i18next';
import { setUserSettings } from '@/redux/slices/user-settings-slice';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserSettingsState } from '@/redux/selectors/user-settings';

export const RegisterForm = () => {
    const { userSettings } = useAppSelector(getUserSettingsState);
    const { t } = useTranslation('form');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isAdmin = router.asPath.split('/').includes('admin');

    const [postRegister, { isLoading, isError, error }] =
        usePostRegisterMutation();

    const [
        postAdminUsers,
        { isLoading: isLoadingAdmin, isError: isErrorAdmin, error: errorAdmin },
    ] = usePostAdminUsersMutation();

    const [
        postLogin,
        { isLoading: isLoadingLogin, isError: isErrorLogin, error: errorLogin },
    ] = usePostLoginMutation();

    const [
        postUserSettings,
        {
            isLoading: isLoadingUserSettings,
            isError: isErrorUserSettings,
            error: errorUserSettings,
        },
    ] = usePostUserSettingsMutation();

    const [
        getProfile,
        { isLoading: isLoadingUser, isError: isErrorUser, error: errorUser },
    ] = useGetProfileMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schemaRegisterForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: FieldValues) => {
        if (data) {
            if (isAdmin) {
                const user = await postAdminUsers(data).unwrap();
                if (user) {
                    const loginUser = await postLogin(data).unwrap();
                    if (loginUser) {
                        dispatch(setUser(await getProfile('').unwrap()));
                        const settings = await postUserSettings(
                            userSettings
                        ).unwrap();
                        if (settings) {
                            dispatch(setUserSettings(settings));
                        }
                        router.push('/');
                    }
                }
            } else {
                const user = await postRegister(data).unwrap();
                if (user) {
                    const loginUser = await postLogin(data).unwrap();
                    if (loginUser) {
                        dispatch(setUser(await getProfile('').unwrap()));
                        const settings = await postUserSettings(
                            userSettings
                        ).unwrap();
                        if (settings) {
                            dispatch(setUserSettings(settings));
                        }
                        router.push('/');
                    }
                }
            }
        }
    };

    const handlerSetRole = useCallback(
        (value: TRole) => {
            setValue('role', value);
        },
        [setValue]
    );

    return (
        <FormWrapper
            title={t('TITLE_FORM_REGISTER', 'Регистрация')}
            name="register"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="text"
                id="UserName"
                placeholder="Name"
                label={t('LABEL_INPUT_USER_NAME', 'Имя')}
                name="name"
                error={!!errors.name}
                control={control}
            />
            <Input
                type="email"
                id="UserEmail"
                placeholder="Email"
                label={t('LABEL_INPUT_EMAIL', 'Почта')}
                name="email"
                error={!!errors.email}
                control={control}
            />
            <Input
                type="password"
                id="UserPassword"
                placeholder="Password"
                label={t('LABEL_INPUT_PASSWORD', 'Пароль')}
                name="password"
                error={!!errors.password}
                control={control}
                autoComplete="new-password"
            />
            <Input
                type="tel"
                id="UserTel"
                placeholder="Phone"
                label={t('LABEL_INPUT_PHONE', 'Телефон')}
                name="contactPhone"
                error={!!errors.contactPhone}
                control={control}
            />
            {isAdmin && (
                <>
                    <ListBox
                        id="RegisterListBox"
                        label="Роль"
                        items={roles}
                        handlerSetItem={handlerSetRole}
                        activeIdx={2}
                    />
                    <Input
                        hidden={true}
                        type="text"
                        id="UserRole"
                        placeholder="Role"
                        label={t('LABEL_INPUT_ROLE', 'Роль')}
                        name="role"
                        error={!!errors.role}
                        control={control}
                    />
                </>
            )}
            <SubmitBtn
                text={`Зарегистрировать${isAdmin ? '' : 'ся'}`}
                isLoading={
                    (isAdmin ? isLoadingAdmin : isLoading) ||
                    isLoadingLogin ||
                    isLoadingUser ||
                    isLoadingUserSettings
                }
                isError={
                    (isAdmin ? isErrorAdmin : isError) ||
                    isErrorLogin ||
                    isErrorUser ||
                    isErrorUserSettings
                }
                error={
                    (isAdmin ? (errorAdmin as TError) : (error as TError)) ||
                    errorLogin ||
                    errorUser ||
                    errorUserSettings
                }
            />
            <FormLink
                label={t(
                    'LABEL_FORM_LINK_ALREDY_REGISTER',
                    'Уже зарегистрированы?'
                )}
                href="/login"
                text={t('ACTION_FORM_LINK_ALREDY_REGISTER', 'Войти')}
            />
        </FormWrapper>
    );
};
