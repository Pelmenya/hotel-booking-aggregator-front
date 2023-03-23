import { TError } from '@/types/t-error';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { Input } from '../components/input/input';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { schemaLoginForm } from '../schemas/yup.schemas';

export const HotelForm = () => {
    
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaLoginForm),
        reValidateMode: 'onChange',
    });

    return (
        <FormWrapper
            title="Добавление отеля"
            onSubmit={handleSubmit(() => {})}
            name="addHotels"
        >
            <Input
                type="text"
                id="HotelName"
                placeholder="Название отеля"
                label="Название отеля"
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
                type="password"
                id="UserPassword"
                placeholder="Password"
                label="Пароль"
                name="password"
                error={!!errors.password}
                control={control}
                autoComplete="new-password"
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
                text="Добавить"
                isError={false}
                isLoading={false}
                error={
                    {
                        error: 'string',
                        message: 'string',
                        statusCode: 'number',
                    } as unknown as TError
                }
            />
        </FormWrapper>
    );
};
