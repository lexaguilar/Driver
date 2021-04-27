import { dialogDefault, DIALOG_CALIFICATION } from "../consts";

const mydialog = {...dialogDefault}


export const calificationDialog = ({ open = false, id = 0, clientId = 0  }) => ({
    type: DIALOG_CALIFICATION,
    payload : { open, id, clientId  }
});

export default function calificationDialogReducer(state = mydialog, { type, payload }) {

    const actions = {
        [DIALOG_CALIFICATION] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}

