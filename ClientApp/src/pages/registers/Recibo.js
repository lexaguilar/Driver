import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, CheckBox, DateBox, NumberBox, Popup, SelectBox, TextArea, TextBox, Validator } from 'devextreme-react';
import { Item } from 'devextreme-react/box';
import Form, { RequiredRule, GroupItem, Label, SimpleItem, AsyncRule, CustomRule, EmptyItem, StringLengthRule } from 'devextreme-react/form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { dataAccess, editorOptionsNumberBox, editorOptionsSwitch, editorOptsTextBoxPhone, formatDate, resources } from '../../data/app';
import { receiptDialog } from '../../store/receipt/receiptReducer';
import http from '../../utils/http';
import { createStore } from '../../utils/proxy';
import uri from '../../utils/uri';
import notify from 'devextreme/ui/notify';
import { dataReceipt } from '../../data/defaultObject';

import 'react-tabs/style/react-tabs.css';
import ReceiptsPreview from '../receipts/ReceiptsPreview';
import useAuthorization from '../../hooks/useAuthorization';

const Recibo = props => {

    const { authorized, auth } = useAuthorization([resources.recibos, dataAccess.create ]);

    const dispatch = useDispatch();
    const { receipt: { open, id } } = useSelector(store => store);
    const refForm = useRef();    

    const [data, setData] = useState({ ...dataReceipt });
    const [dataClient, setDataClient] = useState({});
    const [tabIndex, setTabIndex] = useState(0);
    const [saving, setSaving] = useState({
        text: 'Guardar',
        loading: false,
        changed : false
    });

    const closeDialog = (load) => {

        dispatch(receiptDialog({ open: false, id: 0 }));
        if(saving.changed)
        {
            const { onSave } = props
            onSave();
        }
       
    }

    const onHiding = ({ load }) => closeDialog(load);

    const save = e => {

        let result = refForm.current.instance.validate();

        if (result.isValid) {

            setSaving({ loading: true, text: 'Guardando...', changed: false });
            let newData = { ...data, registerId: id };

            http(uri.receipts.insert).asPost(newData).then(resp => {

                setSaving({ loading: false, text: 'Guardar', changed: true });
                notify(`Recibo aplicado correctamente`);
                setData({});
                loadDataClient();
                //closeDialog();

            }).catch(err => {

                setSaving({ loading: false, text: 'Guardar', changed: false });
                notify(err, 'error', 5000);

            });

        }

    }

    const loadDataClient = (params) => {

        http(uri.registers.getById(id)).asGet().then(resp => {
               
            //pagado
            const pagado = resp.receipts.reduce((a, b) => (+a) + (+b.amount), 0);
            //pendiente
            const pendiente = resp.total - pagado;

            resp['pagado'] = pagado;
            resp['pendiente'] = pendiente;
            resp['id'] = id;

            setDataClient({ ...dataClient, ...resp });
            setData({ ...dataReceipt });
        });
        
    }

    useEffect(() => {

        if (id > 0) {

            loadDataClient();

        }

    }, [open]);    

    return authorized(
        <div>
            <Popup
                width={650}
                height={600}
                title={`Registrar recibo para la matricula #${id}`}
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
                <br />
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>                        
                    <TabList>
                        <Tab>Nuevo recibo</Tab>
                        <Tab>Recibos</Tab>                          
                    </TabList>

                    <TabPanel>   
                        <Form formData={data} ref={refForm}>
                            <GroupItem colCount={6} caption="Generar recibo">
                                <SimpleItem dataField="amount" colSpan={3} editorType="dxNumberBox"
                                    editorOptions={{
                                        ...editorOptionsNumberBox
                                    }}>
                                    <Label text="Monto Aplicado" />
                                    <RequiredRule message="Complete este campo" />
                                </SimpleItem>
                                <SimpleItem dataField="reference" colSpan={3}>
                                    <Label text="No Recibo" />
                                    <RequiredRule message="Complete este campo" />
                                </SimpleItem>
                                <SimpleItem dataField="observation" colSpan={6}>
                                    <Label text="Observacion" />
                                    <StringLengthRule max={250} message="Maximo de carateres permitidos 250"  />
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
                    </TabPanel>
                    <TabPanel>
                        <ReceiptsPreview isPreview={true} registerId={id}/>
                    </TabPanel>                       
                </Tabs>
                
            </Popup>
        </div>
    );
}

export default Recibo;
