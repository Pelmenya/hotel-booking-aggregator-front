import { TUser, userKeysCount } from '@/types/t-user';

export const getFullnessProfile = (user: TUser) => {
    if (user) {
        const objUser = {...user};
        let cnPropertes = Object.keys(user).length - 1 > userKeysCount ? Object.keys(user).length - 1 : userKeysCount;
        let cn = 0;
        if (objUser.avatars && objUser.avatars.length) {
            cn = cn  + 1;
        }
        objUser.avatars = undefined;
        cn = cn + Object.keys(objUser).reduce((acc, item) => {
            if (objUser[item]) {
                return  acc + 1;
            }
            return acc;
        }, 0)
        

        return Math.floor((100/cnPropertes * cn))
    }

    return 0;
};
