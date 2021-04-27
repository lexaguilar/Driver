import { Box, Button, CheckBox, DateBox, NumberBox, Popup, SelectBox, TextArea, TextBox, Validator } from 'devextreme-react';
import { Item } from 'devextreme-react/box';
import Form, { RequiredRule, GroupItem, Label, SimpleItem, AsyncRule, CustomRule, EmptyItem } from 'devextreme-react/form';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editorOptionsNumberBox, editorOptionsSwitch, editorOptsTextBoxPhone, formatDate } from '../../data/app';
import { calificationDialog } from '../../store/calification/calificationReducer';
import http from '../../utils/http';
import { createStore } from '../../utils/proxy';
import uri from '../../utils/uri';
import notify from 'devextreme/ui/notify';
import useTypeLicences from '../../hooks/useTypeLicences';

const Calification = props => {
    const dispatch = useDispatch();
    const { calification: { open, id }, appInfo } = useSelector(store => store);
    const refForm = useRef();

    const dataDefault = {
        endDate:null,
        noteTheoretical: '',
        notePractice: '',
        dateTheoretical:null,
        datePractice:null,
        acta:'',
        folio:'',
        book:'',
        actaYear:'',
        applyPay: false,
        amount: 0,
        reference:'',
    }

    const [data, setData] = useState({ ...dataDefault });
    const [dataClient, setDataClient] = useState({});
    const [saving, setSaving] = useState({
        text: 'Guardar',
        loading: false
    });

    const closeDialog = (load) => {
        dispatch(calificationDialog({ open: false, id: 0 }));

        if (load) {

            let { onSave } = props;
            onSave();

        }
    }

    const onHiding = ({ load }) => closeDialog(load);

    const save = e => {

        let result = refForm.current.instance.validate();

        if (result.isValid) {

            setSaving({ loading: true, text: 'Guardando...' });
            let newData = { ...data, id };

            http(`registers/put`).asPost(newData).then(resp => {

                setSaving({ loading: false, text: 'Guardar' });
                notify(`Calificaiones registrada correctamente`);
                closeDialog(true);

            }).catch(err => {

                setSaving({ loading: false, text: 'Guardar' });
                notify(err, 'error', 5000);

            });

        }

    }

    useEffect(() => {

        if (id > 0) {

            http(uri.registers.getById(id)).asGet().then(resp => {
                console.log(resp);
                //pagado
                const pagado = resp.receipts.reduce((a, b) => (+a) + (+b.amount), 0);
                //pendiente
                const pendiente = resp.total - pagado;

                resp['pagado'] = pagado;
                resp['pendiente'] = pendiente;
                resp['id'] = id;

                setDataClient({ ...dataClient, ...resp });
                setData({ ...dataDefault, ...resp });
            });

        }

    }, [open]);

    const validationCallback = (e) => {
        return new Promise(resolve => {           
            resolve((data.applyPay && data.reference != '' && data.amount > 0) || (!data.applyPay && data.reference == '' && data.amount == 0));
        });
    }

    return (
        <div>
            <Popup
                width={600}
                height={715}
                title={`Registrar calificaciones de la matricula #${id}`}
                onHiding={onHiding}
                visible={open}
                className="bg-fbfbfb"
            >
                <Form formData={dataClient} readOnly={true}>
                    <GroupItem colCount={6}>
                        <SimpleItem dataField="client.name" colSpan={6} >
                            <Label text="Nombre" />
                        </SimpleItem>
                        <SimpleItem dataField="typeLicence.name" colSpan={3} >
                            <Label text="Tipo de Licencia" />
                        </SimpleItem>
                        <SimpleItem dataField="categories" colSpan={3} >
                            <Label text="Categorias" />
                        </SimpleItem>
                        <SimpleItem dataField="observation" colSpan={6} >
                            <Label text="Observacion" />
                        </SimpleItem>
                        <SimpleItem dataField="total" colSpan={2} >
                            <Label text="Total" />
                        </SimpleItem>
                        <SimpleItem dataField="pagado" colSpan={2} >
                            <Label text="Pagado" />
                        </SimpleItem>
                        <SimpleItem dataField="pendiente" colSpan={2} >
                            <Label text="Pendiente" />
                        </SimpleItem>
                    </GroupItem>
                </Form>
                <Form formData={data} ref={refForm}>
                    <GroupItem colCount={6} caption="Calificacion">
                        <SimpleItem dataField="endDate" colSpan={3} editorType="dxDateBox"
                            editorOptions={{ displayFormat: formatDate, openOnFieldClick: true }}>
                            <Label text="Fecha Fin" />
                            <RequiredRule message="Seleccione la fecha de inicio" />
                        </SimpleItem>
                        <EmptyItem colSpan={3} />
                        <SimpleItem dataField="noteTheoretical" colSpan={3} editorType="dxNumberBox"
                            editorOptions={{ ...editorOptionsNumberBox }}>
                            <Label text="Nota teórica" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="notePractice" colSpan={3} editorType="dxNumberBox"
                            editorOptions={{ ...editorOptionsNumberBox }}>
                            <Label text="Nota práctica" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="acta" colSpan={3} editorType="dxNumberBox"
                            editorOptions={{ ...editorOptionsNumberBox }}>
                            <Label text="Acta" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="folio" colSpan={3} editorType="dxNumberBox"
                            editorOptions={{ ...editorOptionsNumberBox }}>
                            <Label text="Folio" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="book" colSpan={3} editorType="dxNumberBox"
                            editorOptions={{ ...editorOptionsNumberBox }}>
                            <Label text="Libro" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="actaYear" colSpan={3} editorType="dxNumberBox"
                            editorOptions={{ ...editorOptionsNumberBox }}>
                            <Label text="Año" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="dateTheoretical" colSpan={3} editorType="dxDateBox"
                            editorOptions={{ displayFormat: formatDate, openOnFieldClick: true }}>
                            <Label text="Examen teórico" />
                            <RequiredRule message="Seleccione la fecha del examen" />
                        </SimpleItem>
                        <SimpleItem dataField="datePractice" colSpan={3} editorType="dxDateBox"
                            editorOptions={{ displayFormat: formatDate, openOnFieldClick: true }}>
                            <Label text="Examen práctico" />
                            <RequiredRule message="Seleccione la fecha del examen" />
                        </SimpleItem>
                        <SimpleItem dataField="applyPay" colSpan={3} editorType="dxSwitch"
                            editorOptions={{ ...editorOptionsSwitch }}>
                            <Label text="Aplicar pagos" />
                        </SimpleItem>
                        <EmptyItem colSpan={3} />
                        <SimpleItem dataField="amount" colSpan={3} editorType="dxNumberBox"
                            editorOptions={{
                                ...editorOptionsNumberBox
                            }}>
                            <Label text="Monto" />
                        </SimpleItem>
                        <SimpleItem dataField="reference" colSpan={3}>
                            <Label text="No Recibo" />
                            <AsyncRule message="Ingrese el recibo" validationCallback={validationCallback}></AsyncRule>
                        </SimpleItem>
                    </GroupItem>
                </Form>
                <br />
                <Button
                    width={180}
                    text={saving.text}
                    disabled={saving.loading}
                    type="default"
                    icon='save'
                    onClick={save}
                />
            </Popup>
        </div>
    );
}

export default Calification;
