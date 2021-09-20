import React, { useEffect, useState } from 'react';
import { Popup } from 'devextreme-react';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import Form, { GroupItem, Label, SimpleItem } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux';
import { editorOptionsSwitch, formatDate, formatDateTime } from '../../data/app';
import { detailsDialog } from '../../store/details/detailsReducer';
import http from '../../utils/http';
import uri from '../../utils/uri';
import notify from 'devextreme/ui/notify';

const Details = props => {

    const dispatch = useDispatch();
    const { details: { open, id } } = useSelector(store => store);
    

 
    const [dataClient, setDataClient] = useState({});   

    const closeDialog = (load) => dispatch(detailsDialog({ open: false, id: 0 }));

    const onHiding = ({ load }) => closeDialog(load);    

    useEffect(() => {

        if (id > 0) {

            http(uri.registers.getById(id)).asGet().then(resp => {
                
                //pagado
                const pagado = resp.receipts.reduce((a, b) => (+a) + (+b.amount), 0);
                //pendiente
                const pendiente = resp.total - pagado;

                resp['pagado'] = pagado;
                resp['pendiente'] = pendiente;
                resp['cancelada'] = !resp.active;

                setDataClient({ ...dataClient, ...resp });
               
            });

        }

    }, [open]);

    const passwordButton = text => {

        http('registers/updateinfo').asPost({ id, observation: text }).then(resp=>{
            notify(`Dato actualizado correctamente`);
            setDataClient({ ...dataClient, ...resp });
        });          
        
    };
  

    return (
        <div>
            <Popup
                width={650}
                height={650}
                title={`Detalles de la matricula #${dataClient.code}`}
                onHiding={onHiding}
                visible={open}
                closeOnOutsideClick={true}
                className="bg-fbfbfb"
            >
                <Form formData={dataClient} readOnly={true}>
                    <GroupItem colCount={6}>                        
                        <SimpleItem dataField="client.name" colSpan={6} >
                            <Label text="Nombre" />
                        </SimpleItem>
                        <SimpleItem dataField="client.identification" colSpan={3} >
                            <Label text="Cedula" />
                        </SimpleItem>
                        <SimpleItem dataField="client.phoneNumber" colSpan={3} >
                            <Label text="Telefono" />
                        </SimpleItem>
                        <SimpleItem dataField="typeLicence.name" colSpan={3} >
                            <Label text="Tipo de Licencia" />
                        </SimpleItem>
                        <SimpleItem dataField="categories" colSpan={3} >
                            <Label text="Categorias" />
                        </SimpleItem>
                        <SimpleItem dataField="startDate" colSpan={3} editorType="dxDateBox"
                            editorOptions={{ displayFormat: formatDate }}>
                            <Label text="Fecha inicio" />
                        </SimpleItem>
                        <SimpleItem dataField="endDate" colSpan={3} editorType="dxDateBox"
                            editorOptions={{ displayFormat: formatDate}}>
                            <Label text="Fecha Fin" />
                        </SimpleItem>
                        <SimpleItem dataField="noteTheoretical" colSpan={3} >
                            <Label text="Nota Teorica" />
                        </SimpleItem>
                        <SimpleItem dataField="notePractice" colSpan={3} >
                            <Label text="Nota Practica" />
                        </SimpleItem>                      
                        <SimpleItem colSpan={6}>
                            <Label text="Observacion" />
                            <TextBox
                                placeholder="Observacion"                                   
                                onValueChanged={e => setDataClient({ ...dataClient, observation : e.value })}
                                onValueChange={value => passwordButton(value)}
                                
                                value={dataClient.observation}>                                    
                            </TextBox>
                        </SimpleItem>
                        <SimpleItem dataField="instructor.name" colSpan={6} >
                            <Label text="Instructor" />
                        </SimpleItem>
                        <SimpleItem dataField="total" colSpan={3} >
                            <Label text="Total" />
                        </SimpleItem>
                        <SimpleItem dataField="pagado" colSpan={3} >
                            <Label text="Pagado" />
                        </SimpleItem>
                        <SimpleItem dataField="cancelada" colSpan={6} editorType="dxSwitch"
                            editorOptions={{ ...editorOptionsSwitch }}>
                            <Label text="Cancelada" />
                        </SimpleItem>
                        <SimpleItem dataField="motiveCancel" colSpan={6} >
                            <Label text="Motivo de cancelación" />
                        </SimpleItem>
                        <SimpleItem dataField="createBy" colSpan={3} >
                            <Label text="Creado por" />
                        </SimpleItem>
                        <SimpleItem dataField="createAt" colSpan={3} editorType="dxDateBox"
                            editorOptions={{ displayFormat: formatDateTime }}>
                            <Label text="Creado el" />
                        </SimpleItem>
                        <SimpleItem dataField="modifyBy" colSpan={3} >
                            <Label text="Modificado por" />
                        </SimpleItem>
                        <SimpleItem dataField="modifyAt" colSpan={3} editorType="dxDateBox"
                            editorOptions={{ displayFormat: formatDateTime}}>
                            <Label text="Modificado el" />
                        </SimpleItem>
                    </GroupItem>
                </Form>
                
            </Popup>
        </div>
    );
}

export default Details;
