import { useState } from 'react';
import { Modal } from '@/components/modal/modal';
import ConfirmIcon from '@/icons/confirm.svg';
import { TUserProps } from '@/types/t-user-props';
import { ConfirmEmailForm } from '@/components/forms/confirm-email-form/confirm-email-form';
import { usePostEmailCodeMutation } from '@/redux/api/confirm';

export const ConfirmEmail = ({ user }: TUserProps) => {
    const [postEmailCode, { isLoading }] = usePostEmailCodeMutation();
    const [isOpenConfirmEmailModal, setIsOpenConfirmEmailModal] =
        useState(false);

    const handlerConfirmEmailModal = async () => {
        const res = await postEmailCode('').unwrap();
        if (res.succes) setIsOpenConfirmEmailModal(true);
    };

    return (
        <div className="flex w-full py-2 justify-between text-error items-center">
            <p>Почта не подтверждена</p>
            <p>{user?.email}</p>
            <button 
                disabled={isLoading} 
                onClick={handlerConfirmEmailModal} 
                className="btn btn-sm flex gap-2"
            >
                <ConfirmIcon />
                Подтвердить
            </button>
            <Modal
                isOpen={isOpenConfirmEmailModal}
                handlerClose={() => {
                    setIsOpenConfirmEmailModal(false);
                }}
            >
                <ConfirmEmailForm user={user}/>

            </Modal>
        </div>
    );
};
