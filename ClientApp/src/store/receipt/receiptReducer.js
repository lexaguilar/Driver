import { dialogDefault, DIALOG_RECEIPT } from "../consts";

const mydialog = {...dialogDefault}


export const receiptDialog = ({ open = false, id = 0, clientId = 0  }) => ({
    type: DIALOG_RECEIPT,
    payload : { open, id, clientId  }
});

export default function receiptDialogReducer(state = mydialog, { type, payload }) {

    const actions = {
        [DIALOG_RECEIPT] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}

