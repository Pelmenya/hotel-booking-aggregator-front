import { TRole } from './t-role';

export interface IUser {
    id: string;
    email: string;
    name: string;
    contactPhone?: string;
    role?: TRole;
}