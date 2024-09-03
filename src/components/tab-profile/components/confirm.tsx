import { useState } from 'react';
import { Modal } from '@/components/modal/modal';
import ConfirmIcon from '@/icons/confirm.svg';
import RepeatRequest from '@/icons/repeat.svg';

import { TUserProps } from '@/types/t-user-props';
import { ConfirmEmailForm } from '@/components/forms/confirm-email-form/confirm-email-form';
import {
    usePostEmailCodeMutation,
    usePostSmsCodeMutation,
} from '@/redux/api/confirm';
import { TSuccess } from '@/types/t-success';
import { ConfirmPhoneForm } from '@/components/forms/confirm-phone-form/confirm-phone-form';
import { Countdown } from '@/components/count-down/count-down';
import { confirmToast, onceMinutes, onceSeconds } from './confirm.constants';
import { toast } from 'react-toastify';

export type TConfirmProps = TUserProps & {
    channel: 'SMS' | 'EMAIL';
};

export const Confirm = ({ user, channel }: TConfirmProps) => {
    const [postEmailCode, { isLoading: isLoadingEmail }] =
        usePostEmailCodeMutation();
    const [postSmsCode, { isLoading: isLoadingSms }] = usePostSmsCodeMutation();

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [countdown, setCountdown] = useState({
        view: false,
        minitues: onceMinutes,
        seconds: onceSeconds,
    });

    const handlerViewCountDown = () => {
        setCountdown({ view: false, minitues: 0, seconds: 0 });
    };

    const handlerConfirmModal = async () => {
        let res: TSuccess = { success: false };
        setCountdown({
            view: true,
            minitues: onceMinutes,
            seconds: onceSeconds,
        });
        
        toast.info(confirmToast)
        if (channel === 'EMAIL') res = await postEmailCode('').unwrap();
        if (channel === 'SMS') res = await postSmsCode('').unwrap();
        if (res.success) setIsOpenConfirmModal(true);
    };

    return (
        <div className="flex w-full py-2 justify-between text-error items-center">
            {channel === 'EMAIL' ? (
                <>
                    <p>Почта не подтверждена</p>
                    <p>{countdown.view ? '' : user?.email}</p>
                </>
            ) : channel === 'SMS' ? (
                <>
                    <p>Телефон не подтвержден</p>
                    <p>{countdown.view ? '' : user?.contactPhone}</p>
                </>
            ) : (
                <></>
            )}
            <>
                {countdown.view ? (
                    <div className="flex gap-2 items-center">
                        <RepeatRequest />
                        <Countdown
                            initialMinutes={countdown.minitues}
                            initialSeconds={countdown.seconds}
                            view={countdown.view}
                            handlerViewCountDown={handlerViewCountDown}
                            textSize="text-base"
                        />
                    </div>
                ) : (
                    <></>
                )}
            </>
            <button
                disabled={isLoadingEmail || isLoadingSms || countdown.view}
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
                    <ConfirmPhoneForm user={user} />
                ) : (
                    <></>
                )}
            </Modal>
        </div>
    );
};
