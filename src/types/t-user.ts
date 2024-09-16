import { TNullable } from './t-nullable';
import { TRole } from './t-role';

export type TUser = TNullable<{
    id: string;
    email: string;
    emailIsConfirm: boolean;
    phoneIsConfirm: boolean;
    name: string;
    birthday?: Date;
    gender?: 'Male' | 'Female'; 
    company? : string;
    address?: string;
    contactPhone?: string;
    role?: TRole;
    avatars?: string[];
}>

export const userKeysCount = 12;