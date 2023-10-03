import { dialogDefault, DIALOG_CLASES } from "../consts";

const mydialog = {...dialogDefault}


export const claseDialog = ({ open = false, id = 0, clientId = 0  }) => ({
    type: DIALOG_CLASES,
    payload : { open, id, clientId  }
});

export default function claseDialogReducer(state = mydialog, { type, payload }) {

    const actions = {
        [DIALOG_CLASES] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}
