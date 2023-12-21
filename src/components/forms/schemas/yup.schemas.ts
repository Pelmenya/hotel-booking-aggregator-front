import * as yup from 'yup';

export const PATTERNS = {
    'PATTERN_PHONE': '^(|(\\+7|8)\\s?(\\(\\d{3}\\)|\\d{3})\\s?[\\-]?\\d{3}[\\-]?\\d{2}[\\-]?\\d{2})$', // пусто или телефон
    'PATTERN_EMAIL': '^[A-Za-z]((\\.|-)?[A-Za-z0-9]+)+@[A-Za-z0-9](-?[A-Za-z0-9]+)+(\\.[A-Za-z]{2,})+$',
    'PATTERN_ROLE': '^(admin|client|manager)+$'
}

export const regExpEmptyString = /''/i;

export const schemaRegisterForm = yup
    .object().shape({
        name: yup.string().min(2).required(),
        email: yup.string().email().matches(new RegExp(PATTERNS.PATTERN_EMAIL)).required(),
        password: yup.string().min(6).required(),
        contactPhone: yup.string().matches(new RegExp(PATTERNS.PATTERN_PHONE)),
        role: yup.string().matches(new RegExp(PATTERNS.PATTERN_ROLE))
    })

export const schemaLoginForm = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })
    .required();

export const schemaHotelForm = yup
    .object({
        title: yup.string().min(2).required(),
        description: yup.string().min(2).required(),
        coordinates: yup.string().matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
    })
    .required();

export const schemaUpdateProfileForm = yup
    .object().shape({
        name: yup.string().min(2).required(),
        email: yup.string().email().matches(new RegExp(PATTERNS.PATTERN_EMAIL)).required(),
        contactPhone: yup.string().matches(new RegExp(PATTERNS.PATTERN_PHONE)),
    })

export const schemaUpdatePasswordForm = yup.object().shape({
    oldPassword: yup.string().min(6).required(), 
    newPassword: yup.string().min(6).required(),
    confirmPassword: yup.string().min(6)
        .oneOf([yup.ref('newPassword')])
        .required()
});