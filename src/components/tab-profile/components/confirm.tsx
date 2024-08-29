import { useState } from 'react';
import { Modal } from '@/components/modal/modal';
import ConfirmIcon from '@/icons/confirm.svg';
import { TUserProps } from '@/types/t-user-props';
import { ConfirmEmailForm } from '@/components/forms/confirm-email-form/confirm-email-form';
import {
    usePostEmailCodeMutation,
    usePostSmsCodeMutation,
} from '@/redux/api/confirm';
import { TSuccess } from '@/types/t-success';

export type TConfirmProps = TUserProps & {
    channel: 'SMS' | 'EMAIL';
};

export const Confirm = ({ user, channel }: TConfirmProps) => {
    const [postEmailCode, { isLoading: isLoadingEmail }] =
        usePostEmailCodeMutation();
    const [postSmsCode, { isLoading: isLoadingSms }] = usePostSmsCodeMutation();

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    const handlerConfirmModal = async () => {
        let res: TSuccess = { success: false };

        if (channel === 'EMAIL') res = await postEmailCode('').unwrap();
        if (channel === 'SMS') res = await postSmsCode('').unwrap();

        if (res.success) setIsOpenConfirmModal(true);
    };

    return (
        <div className="flex w-full py-2 justify-between text-error items-center">
            {channel === 'EMAIL' ? (
                <>
                    <p>Почта не подтверждена</p>
                    <p>{user?.email}</p>
                </>
            ) : channel === 'SMS' ? (
                <>
                    <p>Телефон не подтвержден</p>
                    <p>{user?.contactPhone}</p>
                </>
            ) : (
                <></>
            )}

            <button
                disabled={isLoadingEmail || isLoadingSms}
                onClick={handlerConfirmModal}
                className="btn btn-sm flex gap-2"
            >
                <ConfirmIcon />
                Подтвердить
            </button>
            <Modal
                isOpen={isOpenConfirmModal}
                handlerClose={() => {
                    setIsOpenConfirmModal(false);
                }}
            >
                {channel === 'EMAIL' ? (
                    <ConfirmEmailForm user={user} />
                ) : channel === 'SMS' ? (
                    <div>PHONE</div>
                ) : (
                    <></>
                )}
            </Modal>
        </div>
    );
};
