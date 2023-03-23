import { TNullable } from './t-nullable';
import { TRole } from './t-role';

export type TUser = TNullable<{
    id: string;
    email: string;
    name: string;
    contactPhone?: string;
    role?: TRole;
}>