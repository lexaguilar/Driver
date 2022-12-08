import { dialogDefault, DIALOG_REGISTER } from "../consts";

const mydialog = {...dialogDefault}


export const registerDialog = ({ open = false, id = 0, clientId = 0  }) => ({
    type: DIALOG_REGISTER,
    payload : { open, id, clientId  }
});

export default function registerDialogReducer(state = mydialog, { type, payload }) {

    const actions = {
        [DIALOG_REGISTER] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}

