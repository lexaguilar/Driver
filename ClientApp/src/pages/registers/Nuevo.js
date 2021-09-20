import { Button, Popup } from 'devextreme-react';
import Form, { RequiredRule, GroupItem, Label, SimpleItem, AsyncRule, EmptyItem, StringLengthRule } from 'devextreme-react/form';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataAccess, editorOptionsNumberBox, editorOptsTextBoxPhone, formatDate, resources } from '../../data/app';
import { registerDialog } from '../../store/register/registerReducer';
import http from '../../utils/http';
import { createStore } from '../../utils/proxy';
import uri from '../../utils/uri';
import { dataDefault } from '../../data/defaultObject';
import notify from 'devextreme/ui/notify';
import useTypeLicences from '../../hooks/useTypeLicences';
import useAuthorization from '../../hooks/useAuthorization';

const Nuevo = props => {

    const { authorized, auth } = useAuthorization([resources.matriculas, dataAccess.create ]);

    const dispatch = useDispatch();
    const { register: { open, id }, appInfo } = useSelector(store => store);
    const refForm = useRef();

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

    const onHiding = ({ load }) => closeDialog(load);

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

    return authorized(
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
                            <StringLengthRule max={20} message="Maximo de carateres permitidos 20" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="phoneNumber" colSpan={3} editorOptions={{ ...editorOptsTextBoxPhone }}>
                            <Label text="Telefono" />
                            <RequiredRule message="Complete este campo" />
                        </SimpleItem>
                        <SimpleItem dataField="age" colSpan={3} editorOptions={{ ...editorOptionsNumberBox }} editorType="dxNumberBox">
                            <Label text="Edad" />
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
                                    let discount = e.value;

                                    if(discount < 0)
                                        discount = 0;

                                    const total = data.subTotal - discount ;
                                    const balance = total - data.initBalance;
                                    setData({ ...data, total: total,balance: balance, discount });
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

                                    let initBalance = e.value;

                                    if(initBalance < 0)
                                        initBalance = 0;

                                    const balance = data.total - initBalance;
                                    setData({ ...data, balance: balance, initBalance });

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
                            <StringLengthRule max={250} message="Maximo de carateres permitidos 250" />
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
