import * as yup from 'yup';

export const PATTERNS = {
    'PATTERN_PHONE': '^(|(\\+7|8)\\s?(\\(\\d{3}\\)|\\d{3})\\s?[\\-]?\\d{3}[\\-]?\\d{2}[\\-]?\\d{2})$',
    'PATTERN_EMAIL': '^[A-Za-z]((\\.|-)?[A-Za-z0-9]+)+@[A-Za-z0-9](-?[A-Za-z0-9]+)+(\\.[A-Za-z]{2,})+$',
}

const regExp = /''/i;
export const schemaRegisterForm = yup
    .object().shape({
        name: yup.string().min(2).required(),
        email: yup.string().email().matches(new RegExp(PATTERNS.PATTERN_EMAIL)).required(),
        password: yup.string().min(6).required(),
        contactPhone: yup.string().matches(new RegExp(PATTERNS.PATTERN_PHONE))
    })

export const schemaLoginForm = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })
    .required();
