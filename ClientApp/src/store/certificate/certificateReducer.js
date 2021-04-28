import { dialogDefault, DIALOG_CERTIFICATE } from "../consts";

const mydialog = {...dialogDefault}


export const certificateDialog = ({ open = false, id = 0 }) => ({
    type: DIALOG_CERTIFICATE,
    payload : { open, id  }
});

export default function certificateDialogReducer(state = mydialog, { type, payload }) {

    const actions = {
        [DIALOG_CERTIFICATE] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}

