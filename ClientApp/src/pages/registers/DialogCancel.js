import React, { useEffect, useRef, useState } from 'react';
import { Popup, Button } from 'devextreme-react';
import Form, { RequiredRule, GroupItem, Label, SimpleItem, AsyncRule, EmptyItem, StringLengthRule } from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import http from '../../utils/http';
import { cancelRegisterDialog } from '../../store/cancelRegister/cancelRegisterReducer';
import { useDispatch, useSelector } from 'react-redux';
import { dataAccess, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';

const DialogCancel = props => {   

    const { authorized, auth } = useAuthorization([resources.matriculas, dataAccess.delete ]);

    const dataDefault = {
        id: 0, 
        motiveCancel: ''
    };


    const dispatch = useDispatch();
    const { open, id } = useSelector(store => store.cancelRegister);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ id:0, motiveCancel: '' });
    const refForm = useRef();

    const closeDialog = (load) => {
        dispatch(cancelRegisterDialog({ open: false, id: 0 }));

        if (load) {

            let { onCancel } = props;
            onCancel();

        }
    }

    const onHiding = ({ load }) => closeDialog(load);

    const cancel = (params) => {

        let result = refForm.current.instance.validate();

        if (result.isValid) {

            setLoading(true);

            http(`registers/${id}/delete`).asPost(data)
                .then(resp => {

                    setLoading(false);
                    notify(`Matricula ${id} anulada correctamente`);
                    closeDialog(true);

                }).catch(err => {
                    setLoading(false);
                    notify(err, 'error');
                });;
        }
    }

    useEffect(() => {

        if (id > 0)
            setData({ ...dataDefault, id });
        else 
            setData({ ...dataDefault});
        

    }, [open]);

    return authorized(
        <div className="">
            <Popup
                width={450}
                height={250}
                title="Confirmar"
                onHiding={onHiding}
                visible={open}
            >
                <p>Esta seguro de eliminar la matricula {id} ?</p>
                <Form formData={data} ref={refForm}>
                    <GroupItem colCount={6}>
                        <SimpleItem dataField="motiveCancel" colSpan={6} editorType='dxTextArea'>
                            <Label text="Motivo" />
                            <StringLengthRule max={150} message="Ingrese el motivo" />
                            <RequiredRule message="Ingrese el motivo" />
                        </SimpleItem>
                    </GroupItem>
                </Form>
                <br />
                <Button
                    width={180}
                    text={loading ? 'Eliminando...' : "Eliminar matricula"}
                    disabled={loading}
                    type="danger"
                    icon="remove"
                    stylingMode="contained"
                    onClick={cancel}
                />
            </Popup>
        </div>
    );
}

export default DialogCancel;