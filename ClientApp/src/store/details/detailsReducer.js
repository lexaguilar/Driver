import { dialogDefault, DIALOG_DETAILS } from "../consts";

const mydialog = {...dialogDefault}


export const detailsDialog = ({ open = false, id = 0, clientId = 0  }) => ({
    type: DIALOG_DETAILS,
    payload : { open, id, clientId  }
});

export default function detailsDialogReducer(state = mydialog, { type, payload }) {

    const actions = {
        [DIALOG_DETAILS] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}

