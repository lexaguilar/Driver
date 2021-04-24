import { Box, Button, CheckBox, DateBox, NumberBox, Popup, SelectBox, TextArea, TextBox, Validator } from 'devextreme-react';
import { Item } from 'devextreme-react/box';
import Form, { RequiredRule, GroupItem, Label, SimpleItem, AsyncRule, CustomRule, EmptyItem } from 'devextreme-react/form';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editorOptionsNumberBox, editorOptsTextBoxPhone, formatDate } from '../../data/app';
import { registerDialog } from '../../store/register/registerReducer';
import http from '../../utils/http';
import { createStore } from '../../utils/proxy';
import uri from '../../utils/uri';
import notify from 'devextreme/ui/notify';
import useTypeLicences from '../../hooks/useTypeLicences';

const Nuevo = props => {

    const dispatch = useDispatch();
    const { register: { open, id }, appInfo } = useSelector(store => store);
    const refForm = useRef();

    const dataDefault = {
        name: '',
        identification: '',
        address: '',
        phoneNumber: '',
        startDate: null,
        subTotal: appInfo.price,
        discount: 0,
        total: appInfo.price,
        initBalance: 0,
        balance: appInfo.price,
        categoryOne: false,
        categoryTwo: false,
        categoryThree: false,
        typeLicenceId: undefined,
        instructorId: 1,
        observation: '',
        reference: ''
    }

    // const dataDefault = {
    //     name: 'silvia salvadora',
    //     identification: '001-120687-0019f',
    //     address: 'carretera norte',
    //     phoneNumber: '8888-8888',
    //     startDate: new Date(),
    //     subTotal: appInfo.price,
    //     discount: 0,
    //     total: appInfo.price,
    //     initBalance: 0,
    //     balance: appInfo.price,
    //     categories: [1, 3],
    //     typeLicenceId: 2,
    //     instructorId: 1,
    //     observation: 'ninguna',
    //     reference: '011'
    // }

    const [data, setData] = useState({ ...dataDefault });
    const { typeLicences } = useTypeLicences();

    const [saving, setSaving] = useState({
        text: 'Guardar',
        loading: false
    });

    const closeDialog = (load) => {
        dispatch(registerDialog({ open: false, id: 0 }));

        if (load) {

            let { onSave } = props;
            onSave();

        }
    }

    const onHiding = ({ load }) => {

        closeDialog(load);

    }

    const save = e => {

        let resultValidate = refForm.current.instance.validate();

        resultValidate.complete.then(result =>{

            if (result.isValid) {

                setSaving({ loading: true, text: 'Guardando...' });
                let newData = { ...data };
    
                http(uri.registers.insert).asPost(newData).then(resp => {
    
                    setSaving({ loading: false, text: 'Guardar' });
                    notify(`Matricula registrada correctamente`);
                    closeDialog(true);
    
                }).catch(err => {
    
                    setSaving({ loading: false, text: 'Guardar' });
                    notify(err, 'error', 5000);
    
                });
    
            }

        });       

    }

    useEffect(() => {

        if (id > 0) {

            http(uri.registers.getById(id)).asGet().then(resp => {

            });

        } else
            setData({
                ...dataDefault,
                subTotal: appInfo.price,
                total: appInfo.price,
                balance: appInfo.price
            });

    }, [open]);

    const validationCallback = (e) => {
        return new Promise(resolve =>{
            resolve((data.initBalance > 0 && data.reference != '') || (data.initBalance == 0 && data.reference == ''));
        });
    }

    return (
        <div>
            <Popup
                width={580}
                height={700}
                title={`Nueva matricula`}
                onHiding={onHiding}
                visible={open}
                className="bg-fbfbfb"
            >
                <Form formData={data} ref={refForm}>
                    <GroupItem colCount={6}>
                        <SimpleItem dataField="name" colSpan={6}>
                            <Label text="Nombre" />
                            <RequiredRule message="Ingrese el nombre" />
                        </SimpleItem>
                        <SimpleItem dataField="identification" colSpan={3}>
                            <Label text="Cédula" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="phoneNumber" colSpan={3} editorOptions={{ ...editorOptsTextBoxPhone }}>
                            <Label text="Telefono" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="address" colSpan={6} editorType="dxTextArea">
                            <Label text="Dirección" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                    </GroupItem>
                    <GroupItem colCount={6} caption="Datos de la matricula">
                        <SimpleItem dataField="startDate" colSpan={3} editorType="dxDateBox"
                            editorOptions={{ displayFormat: formatDate, openOnFieldClick: true }}>
                            <Label text="Fecha Inicio" />
                            <RequiredRule message="Seleccione la fecha de inicio" />
                        </SimpleItem>
                        <SimpleItem dataField="subTotal" colSpan={3} editorType="dxNumberBox" editorOptions={{ ...editorOptionsNumberBox, disabled: true }}>
                            <Label text="Precio" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="discount" colSpan={3} editorType="dxNumberBox"
                            editorOptions={{
                                ...editorOptionsNumberBox,
                                onValueChanged: e => {
                                    const total = data.subTotal - e.value;
                                    setData({ ...data, total: total });
                                }
                            }}>
                            <Label text="Descuento" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="total" colSpan={3} editorType="dxNumberBox" editorOptions={{ ...editorOptionsNumberBox, disabled: true }}>
                            <Label text="Total" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="initBalance" colSpan={3} editorType="dxNumberBox"
                            editorOptions={{
                                ...editorOptionsNumberBox,
                                onValueChanged: e => {

                                    const balance = data.total - e.value;
                                    setData({ ...data, balance: balance });

                                }
                            }}>
                            <Label text="Abono inicial" />
                        </SimpleItem>
                        <SimpleItem dataField="balance" colSpan={3} editorType="dxNumberBox" editorOptions={{ ...editorOptionsNumberBox, disabled: true }}>
                            <Label text="Pendiente" />
                        </SimpleItem>
                        <SimpleItem dataField="reference" colSpan={3}>
                            <Label text="No Recibo" />
                            <AsyncRule message="Ingrese el recibo" validationCallback={validationCallback}></AsyncRule>
                        </SimpleItem>
                        <EmptyItem colSpan={3} />
                        <SimpleItem dataField="categories" colSpan={3} editorType="dxTagBox" editorOptions={{
                            dataSource: [1, 2, 3],
                            showSelectionControls: true,

                        }}>
                            <Label text="Categorias" />
                            <RequiredRule message="Seleccione una categoria" />
                        </SimpleItem>
                        <SimpleItem dataField="typeLicenceId" colSpan={3} editorType="dxRadioGroup" editorOptions={{
                            dataSource: typeLicences,
                            displayExpr: 'name',
                            valueExpr: 'id',
                        }}>
                            <Label text="Tipo" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>


                        <SimpleItem dataField="instructorId" colSpan={6} editorType="dxSelectBox" editorOptions={{
                            dataSource: createStore({ name: 'Instructor' })
                            , displayExpr: "name"
                            , valueExpr: "id"
                        }}>
                            <Label text="Instructor" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="observation" colSpan={6} editorType="dxTextArea">
                            <Label text="Observacion" />
                        </SimpleItem>
                    </GroupItem>
                </Form>
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

export default Nuevo;
