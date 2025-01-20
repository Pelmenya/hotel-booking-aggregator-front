export const getGender = (gender: 'Male' | 'Female'): string => {
    switch (gender) {
        case 'Male':
            return 'Мужской';
        case 'Female':
            return 'Женский';
        default: return gender;
    }
}