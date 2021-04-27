import { dialogDefault, DIALOG_CANCELREGISTER } from "../consts";

const mydialog = {...dialogDefault}


export const cancelRegisterDialog = ({ open = false, id = 0 }) => ({
    type: DIALOG_CANCELREGISTER,
    payload : { open, id  }
});

export default function cancelRegisterDialogReducer(state = mydialog, { type, payload }) {

    const actions = {
        [DIALOG_CANCELREGISTER] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}

