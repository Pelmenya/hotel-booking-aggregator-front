import * as yup from 'yup';

export const schemaRegisterForm = yup
    .object({
        name: yup.string().min(2).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })
    .required();

export const schemaLoginForm = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })
    .required();
