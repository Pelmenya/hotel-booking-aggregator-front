import { TRole } from '@/types/t-role';

export const getRole = (role: TRole): string => {
    switch (role) {
        case 'admin':
            return 'администратор';
        case 'manager':
            return 'менеджер';
        case 'client':
            return 'клиент';
        default: return role;
    }
}