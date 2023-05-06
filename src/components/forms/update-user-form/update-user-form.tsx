import { Input } from '../components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegisterForm } from '../schemas/yup.schemas';
import { FieldValues, useForm } from 'react-hook-form';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { TError } from '@/types/t-error';
import { usePostLoginMutation } from '@/redux/api/auth';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';

export const UpdateUserForm = () => {
    const dispatch = useAppDispatch();

    const [
        postLogin,
        { isLoading: isLoadingLogin, isError: isErrorLogin, error: errorLogin },
    ] = usePostLoginMutation();

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
        }
    };

    return (
        <FormWrapper
            title="Регистрация"
            name="register"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="text"
                id="UserName"
                placeholder="Name"
                label="Имя"
                name="name"
                error={!!errors.name}
                control={control}
            />
            <Input
                type="email"
                id="UserEmail"
                placeholder="Email"
                label="Почта"
                name="email"
                error={!!errors.email}
                control={control}
            />
            <Input
                type="tel"
                id="UserTel"
                placeholder="Phone"
                label="Телефон"
                name="contactPhone"
                error={!!errors.contactPhone}
                control={control}
            />
            <SubmitBtn
                text={'update'}
                isLoading={
                    false
                }
                isError={
                    false
                }
                error={{ data: { error: '', statusCode: 0, message: ''} }}
            />
        </FormWrapper>
    );
};
