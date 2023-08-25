import { useState } from 'react';
import { Modal } from '@/components/modal/modal';
import ConfirmIcon from '@/icons/confirm.svg';
import { TUserProps } from '@/types/t-user-props';

export const ConfirmEmail = ({ user }: TUserProps) => {
    const [isOpenConfirmEmailModal, setIsOpenConfirmEmailModal] =
        useState(false);
    return (
        <div className="flex w-full py-2 justify-between text-error items-center">
            <p>Почта не подтверждена</p>
            <p>{user?.email}</p>
            <button onClick={() => setIsOpenConfirmEmailModal(true)} className="btn btn-sm flex gap-2">
                <ConfirmIcon />
                Подтвердить
            </button>
            <Modal
                title="Подтверждение почты"
                isOpen={isOpenConfirmEmailModal}
                handlerClose={() => {
                    setIsOpenConfirmEmailModal(false);
                }}
            >
                <form>
                    
                </form>

            </Modal>
        </div>
    );
};
