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
import { useEffect, useMemo, useState } from 'react';
import { TUser } from '@/types/t-user';
import { setUser } from '@/redux/slices/user';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/components/list-box/list-box';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';

export const UpdateUserForm = () => {
    const { t, i18n } = useTranslation('form');
    const { user } = useAppSelector(getUserState);
    const dispatch = useAppDispatch();

    const [updateUser, { isLoading, isError, error }] =
        useUpdateProfileMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
        register,
    } = useForm({
        resolver: yupResolver(schemaUpdateProfileForm),
        reValidateMode: 'onChange',
    });

    const genders = useMemo(
        () => [
            t('LABEL_INPUT_GENDER_MALE', 'Мужской'),
            t('LABEL_INPUT_GENDER_FEMALE', 'Женский'),
        ],
        [t]
    );

    const [activeGender, setActiveGender] = useState(
        user?.gender
            ? user?.gender === 'Male'
                ? 0
                : user?.gender === 'Female'
                    ? 1
                    : null
            : null
    );

    useEffect(() => {
        const gender = getValues().gender;
        if (gender === 'Male' || gender === 'Мужской') {
            setActiveGender(0);
        } else if (gender === 'Female' || gender === 'Женский') {
            setActiveGender(1);
        } else {
            setActiveGender(null);
        }
    }, [i18n.language, getValues]);

    const onSubmit = async (data: FieldValues) => {
        if (data) {
            console.log(data);
            const formData = new FormData();
            user?.avatars?.forEach((file) => formData.append('avatars', file));
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('contactPhone', data.contactPhone);
            if (data.gender) {
                formData.append(
                    'gender',
                    data.gender === 'Male' || data.gender === 'Мужской'
                        ? 'Male'
                        : 'Female'
                );
            }
            if (data.birthday) {
                formData.append(
                    'birthday',
                    new Date(data.birthday).toISOString()
                );
            }
            if (data.company) {
                formData.append('company', data.company);
            }
            if (data.address) {
                formData.append('address', data.address);
            }
            const newUser = await updateUser(
                formData as Partial<TUser>
            ).unwrap();
            if (newUser) {
                dispatch(setUser(newUser));
                toast.success(
                    t(
                        'TOAST_SUCCESS_PROFILE_UPDATED',
                        'Профиль пользователя обновлен'
                    )
                );
            }
        }
    };

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
            setValue('contactPhone', user.contactPhone);
            if (!getValues().gender) {
                setValue('gender', user.gender);
            }
            setValue('birthday', user.birthday);
            setValue('company', user.company);
            setValue('address', user.address);
        }
    }, [user, setValue, getValues]);

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
                    <Input
                        type="text"
                        id="UserCompany"
                        placeholder="Company"
                        label={t('LABEL_INPUT_COMPANY', 'Компания')}
                        name="company"
                        error={!!errors.company}
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
                <div className="grid grid-cols-2 gap-4">
                    <ListBox
                        id="GenderListBox"
                        label={t('LABEL_INPUT_GENDER', 'Пол')}
                        items={[...genders]}
                        handlerSetItem={(value) => {
                            if (value) {
                                setValue(
                                    'gender',
                                    value === 'Male' || value === 'Мужской'
                                        ? 'Male'
                                        : 'Female'
                                );

                                const newActiveGender =
                                    value === 'Male' || value === 'Мужской'
                                        ? 0
                                        : 1;
                                setActiveGender(newActiveGender);
                            }
                        }}
                        activeIdx={activeGender}
                    />
                    <input
                        hidden={true}
                        type="text"
                        id="UserGender"
                        placeholder="Gender"
                        {...register('gender')}
                    />
                    <Input
                        type="date"
                        id="UserBirthday"
                        placeholder="Birthday"
                        label={t('LABEL_INPUT_BIRTHDAY', 'Дата рождения')}
                        name="birthday"
                        error={!!errors.birthday}
                        control={control}
                    />
                </div>
                <SubmitBtn
                    text={t('CAPTION_SUBMIT_BTN_EDIT', 'Редактировать')}
                    isLoading={isLoading}
                    isError={isError}
                    error={error as TError}
                />
            </div>
        </FormWrapper>
    );
};
