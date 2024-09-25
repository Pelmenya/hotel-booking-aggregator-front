import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/input/input';
import { useForm } from 'react-hook-form';
import { schemaConfirmEmailForm } from '../schemas/yup.schemas';
import { TError } from '@/types/t-error';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { TUserProps } from '@/types/t-user-props';
import { usePutConfirmEmailMutation } from '@/redux/api/confirm-api';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { useGetProfileMutation } from '@/redux/api/common-api';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user-slice';
import { useTranslation } from 'react-i18next';

export const ConfirmEmailForm = ({ user }: TUserProps) => {
    const { t } = useTranslation('form');
    const [putConfirmEmail, { isLoading, isError, error }] =
        usePutConfirmEmailMutation();
    const [getProfile] = useGetProfileMutation();
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaConfirmEmailForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (dto: FieldValues) => {
        if (dto) {
            const res = await putConfirmEmail(dto as { code: string }).unwrap();
            if (res.success) {
                dispatch(setUser(await getProfile('').unwrap()));
            }
        }
    };

    return (
        <FormWrapper
            title={
                t('TITLE_FORM_CODE_FROM_EMAIL', 'Код из письма ') + user?.email
            }
            name="code"
            className="py-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="text"
                id="confirmEmail"
                placeholder="ConfirmEmail"
                label={t('LABEL_INPUT_CONFIRM_EMAIL', 'Вставить код')}
                control={control}
                error={!!errors.code}
                name="code"
            />
            <SubmitBtn
                text={t('CAPTION_SUBMIT_BATN_CONFIRM', 'Подтвердить')}
                error={error as TError}
                isError={isError}
                isLoading={isLoading}
            />
        </FormWrapper>
    );
};
