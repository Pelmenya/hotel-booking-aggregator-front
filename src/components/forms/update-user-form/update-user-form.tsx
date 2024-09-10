import { Input } from '../components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaUpdateProfileForm } from '../schemas/yup.schemas';
import { FieldValues, useForm } from 'react-hook-form';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { TError } from '@/types/t-error';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';
import { useUpdateProfileMutation } from '@/redux/api/common';
import { useEffect } from 'react';
import { TUser } from '@/types/t-user';
import { setUser } from '@/redux/slices/user';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/components/list-box/list-box';

export const UpdateUserForm = () => {
    const { t } = useTranslation('form');
    const { user } = useAppSelector(getUserState);
    const dispatch = useAppDispatch();

    const [updateUser, { isLoading, isError, error }] =
        useUpdateProfileMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schemaUpdateProfileForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: FieldValues) => {
        if (data) {
            const formData = new FormData();
            user?.avatars?.forEach((file) => formData.append('avatars', file));
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('contactPhone', data.contactPhone);

            const newUser = await updateUser(
                formData as Partial<TUser>
            ).unwrap();
            if (newUser) {
                dispatch(setUser(newUser));
                toast.success('Профиль пользователя обновлен');
            }
        }
    };

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
            setValue('contactPhone', user.contactPhone);
        }
    }, [user, setValue]);

    return (
        <FormWrapper
            title={t('TITLE_FORM_UPDATE_USER', 'Редактирование профиля')}
            name="profile"
            maxWidth="max-w-lg"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full flex flex-col gap-4">
                <Input
                    type="text"
                    id="UserName"
                    placeholder="Name"
                    label={t('LABEL_INPUT_USER_NAME', 'Имя')}
                    name="name"
                    error={!!errors.name}
                    control={control}
                />
                <div className="grid grid-cols-2 gap-4">
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
                        type="tel"
                        id="UserTel"
                        placeholder="Phone"
                        label={t('LABEL_INPUT_PHONE', 'Телефон')}
                        name="contactPhone"
                        error={!!errors.contactPhone}
                        control={control}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ListBox
                        id="GenderListBox"
                        label={t('LABEL_INPUT_GENDER', 'Пол')}
                        items={['Мужской', 'Женский']}
                        handlerSetItem={() => {}}
                        activeIdx={0}
                    />
                    <Input
                        hidden={true}
                        type="text"
                        id="UserGender"
                        placeholder="Gender"
                        label={t('LABEL_INPUT_GENDER', 'Пол')}
                        name="gender"
                        error={!!errors.gender}
                        control={control}
                    />
                    <Input
                        type="text"
                        id="UserAddress"
                        placeholder="Address"
                        label={t('LABEL_INPUT_ADDRESS', 'Адрес')}
                        name="address"
                        error={!!errors.address}
                        control={control}
                    />
                </div>
                <SubmitBtn
                    text={'Редактировать'}
                    isLoading={isLoading}
                    isError={isError}
                    error={error as TError}
                />
            </div>
        </FormWrapper>
    );
};
