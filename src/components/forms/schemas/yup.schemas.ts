import * as yup from 'yup';


export const PATTERNS = {
    'PATTERN_PHONE': '^(|(\\+7|8)\\s?(\\(\\d{3}\\)|\\d{3})\\s?[\\-]?\\d{3}[\\-]?\\d{2}[\\-]?\\d{2})$', // пусто или телефон
    'PATTERN_EMAIL': '^[A-Za-z]((\\.|-)?[A-Za-z0-9]+)+@[A-Za-z0-9](-?[A-Za-z0-9]+)+(\\.[A-Za-z]{2,})+$',
    'PATTERN_ROLE': '^(admin|client|manager)+$',
    'PATTERN_UUID': '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    'PATTERN_SMS_CODE': '^[1-9]{4}$' // только 4 цифры
}

export const regExpEmptyString = /''/i;

export const schemaHotelForm = yup.object().shape({
    title: yup.string().required('Название отеля обязательно'),
    area: yup.number().required('Площадь обязательна').positive('Площадь должна быть положительной'),
    countRooms: yup.number().required('Количество комнат обязательно').positive('Должно быть больше нуля'),
    countGuests: yup.number().required('Количество гостей обязательно').positive('Должно быть больше нуля'),
});

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

export const schemaUpdateProfileForm = yup
    .object().shape({
        name: yup.string().min(2).required(),
        gender: yup.string().notRequired(),
        address: yup.string().notRequired(),
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

export const schemaConfirmEmailForm = yup.object().shape({
    code: yup.string().matches(new RegExp(PATTERNS.PATTERN_UUID)).required()
});

export const schemaConfirmPhoneForm = yup.object().shape({
    codeSms: yup.string().matches(new RegExp(PATTERNS.PATTERN_SMS_CODE)).required()
});
