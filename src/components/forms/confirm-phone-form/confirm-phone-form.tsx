import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/input/input';
import { useForm } from 'react-hook-form';
import { schemaConfirmPhoneForm } from '../schemas/yup.schemas';
import { TError } from '@/types/t-error';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { TUserProps } from '@/types/t-user-props';
import { usePutConfirmPhoneMutation } from '@/redux/api/confirm';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { useGetProfileMutation } from '@/redux/api/common';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user';
import { useTranslation } from 'react-i18next';

export const ConfirmPhoneForm = ({ user }: TUserProps) => {
    const { t } = useTranslation('form');
    const [putConfirmPhone, { isLoading, isError, error }] =
        usePutConfirmPhoneMutation();
    const [getProfile] = useGetProfileMutation();
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaConfirmPhoneForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (dto: FieldValues) => {
        if (dto) {
            const code = dto.codeSms;
            const res = await putConfirmPhone({ code }).unwrap();
            if (res.success) {
                dispatch(setUser(await getProfile('').unwrap()));
            }
        }
    };

    return (
        <FormWrapper
            title={t('TITLE_FORM_CODE_FROM_SMS', 'Код из SMS ') + user?.contactPhone}
            name="code"
            className="py-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="text"
                id="confirmSmsCode"
                placeholder="ConfirmSmsCode"
                label={t('LABEL_INPUT_CONFIRM_SMS','Вставить код')}
                control={control}
                error={!!errors.codeSms}
                name="codeSms"
            />
            <SubmitBtn
                text="Подтвердить"
                error={error as TError}
                isError={isError}
                isLoading={isLoading}
            />
        </FormWrapper>
    );
};
