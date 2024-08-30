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

export const ConfirmPhoneForm = ({ user }: TUserProps) => {
    const [putConfirmPhone, {isLoading, isError, error}] = usePutConfirmPhoneMutation();
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
            const res = await putConfirmPhone(dto as {code: number}).unwrap();
            if (res.success) {
                dispatch(setUser(await getProfile('').unwrap()));
            }
        }
    };

    return (
        <FormWrapper
            title={'Код из SMS ' + user?.contactPhone}
            name="code"
            className='py-4'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="text"
                id="confirmSmsCode"
                placeholder="ConfirmSmsCode"
                label='Вставить код'
                control={control}
                error={!!errors.code}
                name="code"
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
