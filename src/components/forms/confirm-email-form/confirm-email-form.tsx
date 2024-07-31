import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/input/input';
import { useForm } from 'react-hook-form';
import { schemaConfirmEmailForm } from '../schemas/yup.schemas';
import { TError } from '@/types/t-error';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { TUserProps } from '@/types/t-user-props';
import { usePostConfirmEmailMutation } from '@/redux/api/confirm';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { useGetProfileMutation } from '@/redux/api/common';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user';

export const ConfirmEmailForm = ({ user }: TUserProps) => {
    const [postConfirmEmail, {isLoading, isError, error}] = usePostConfirmEmailMutation();
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
            const res = await postConfirmEmail(dto as {code: string}).unwrap();
            if (res.succes) {
                dispatch(setUser(await getProfile('').unwrap()));
            }
        }
    };

    return (
        <FormWrapper
            title={'Код из письма ' + user?.email}
            name="code"
            className='py-4'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="text"
                id="confirmPassword"
                placeholder="ConfirmPassword"
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
