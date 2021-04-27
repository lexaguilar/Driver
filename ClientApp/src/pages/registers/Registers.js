import { DataGrid } from 'devextreme-react';
import { Column, Editing, Export, FilterRow, Lookup, Pager, Paging, Button as ButtonGrid, ColumnChooser } from 'devextreme-react/data-grid';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { dataAccess, formatDate, formatDateTime, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';
import { store } from '../../services/store';
import { registerDialog } from '../../store/register/registerReducer';
import { calificationDialog } from '../../store/calification/calificationReducer';
import { cancelRegisterDialog } from '../../store/cancelRegister/cancelRegisterReducer';
import { detailsDialog } from '../../store/details/detailsReducer';
import { receiptDialog  } from '../../store/receipt/receiptReducer';
import { cellRenderBold, copyText } from '../../utils/common';
import { createStore } from '../../utils/proxy';
import urlReport from '../../services/reportServices';
import uri from '../../utils/uri';
import Nuevo from './Nuevo';
import Calification from './Calification';
import http from '../../utils/http';
import DialogCancel from './DialogCancel';
import Details from './Details';
import Recibo from './Recibo';

const Registers = () => {

    const dispatch = useDispatch();

    const { authorized } = useAuthorization([resources.matriculas, dataAccess.access ]);

    let dataGrid = useRef();

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Nueva matricula',
                icon:'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  openDialog(0)
            }
        });
    }  

    const load = () => dataGrid.current.instance.refresh();

    const openDialog = id => dispatch(registerDialog({ open: true, id}));
    const openDialogCalification = id => dispatch(calificationDialog({ open: true, id}));
    const openDialogCancelRegister = id => dispatch(cancelRegisterDialog({ open: true, id}));
    const openDialogDetails = id => dispatch(detailsDialog({ open: true, id}));
    const openDialogReceipt = id => dispatch(receiptDialog({ open: true, id}));

    const addMenuItems = (e) => {

        if (e.target == "content") {
            if (!e.items) e.items = [];
 
            e.items.push({
                text: `Nueva matricula`,
                icon :  'plus',
                onItemClick: () => openDialog(0)
            },{
                text: `Registrar notas`,
                icon :  'edit',
                onItemClick: () => openDialogCalification(e.row.data.id)
            },{
                text: `Detalles`,
                icon :  'bulletlist',
                onItemClick: () => openDialogDetails(e.row.data.id)
            },{
                text: `Generar recibo de pago`,
                icon :  'money',
                onItemClick: () => openDialogReceipt(e.row.data.id)
            },{
                text: `Imprimir certificado`,
                icon :  'doc',
                onItemClick: () => {                    

                    const report = urlReport();
                    report.print(`${report.certificate(e.row.data.id)}`);   

                }
            },{
                text: `Anular matricula`,
                icon :  'remove',
                onItemClick: () => openDialogCancelRegister(e.row.data.id)          
            },{
                text: `Copiar`,
                icon :  'unselectall',
                onItemClick: () => copyText(e.row.values[e.columnIndex]) 
            });
        }
    }

    const onCellPrepared = e => {

        const cellsQuantity = ['payoff']
            
        if (e.rowType == 'data') {
            if(cellsQuantity.includes(e.column.dataField))
                if(e.row.data.payoff)
                    e.cellElement.classList.add('pagada');
                else           
                    e.cellElement.classList.add('pendiente');  
                    
            if(e.column.dataField == 'id')
                e.cellElement.classList.add('col-id');  
        }
    
    }

    const onRowPrepared = (e) => {
        if (e.rowType == 'data') {

            if (!e.data.active) 
                e.rowElement.classList.add('no-activo');
            
        }
    }

    const cellAsPayoff = data => <b>{data.value ? 'Pagada' : 'Pendiente'}</b>;    

    const title = 'Matriculas';
    
    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>   
              
            <Nuevo onSave={load}/>     
            <Calification onSave={load}/>     
            <DialogCancel onCancel={load} />  
            <Recibo onSave={load} />  
            <Details/>

            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.registers, remoteOperations : true})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                columnHidingEnabled={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                columnAutoWidth={true}
                onCellPrepared={onCellPrepared}
                onToolbarPreparing={onToolbarPreparing}
                onContextMenuPreparing={addMenuItems}
                onRowPrepared={onRowPrepared}
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}
            >
                <Paging defaultPageSize={10} />
                <Pager
                    showInfo={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <ColumnChooser enabled={true} />
                <FilterRow visible={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id" caption="Codigo #"  width={80}/>
                <Column dataField="areaId" caption="Sucursal" width={100}>
                    <Lookup dataSource ={createStore({name: 'Area'})} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>
                <Column dataField="identification" width={140} caption="Identificacion" />
                <Column dataField="name" caption="Nombre completo" />
                <Column dataField="phoneNumber" width={90} caption="Telefono" allowFiltering={false} />
                <Column dataField="typeLicenceId" caption="Tipo" width={120}>
                    <Lookup dataSource ={createStore({name: 'TypeLicence'})} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>
                <Column dataField="categories" caption="Categorias" width={90} allowFiltering={false}/>
                <Column dataField="startDate" caption="Inicio" dataType='date' format={formatDate} width={100} />   
                <Column dataField="total" width={90} cellRender={cellRenderBold()}/>
                <Column dataField="subTotal" visible={false} width={80} cellRender={cellRenderBold()}/>
                <Column dataField="discount" visible={false} width={80} cellRender={cellRenderBold()}/>
                <Column dataField="abonos" caption="Pagado" width={90} cellRender={cellRenderBold()} allowFiltering={false}/>
                <Column dataField="payoff" width={90} caption='Pagada' dataType="boolean" cellRender={cellAsPayoff}/>

                <Column dataField="instructorId" caption="Instructor" width={150}>
                    <Lookup dataSource ={createStore({name: 'Instructor'})} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>
                <Column dataField="createBy" caption='Creado por' width={100} />
                <Column dataField="createAt" caption='Creado el' dataType='date'  format={formatDateTime} width={180}/>
                <Column dataField="modifyBy" caption='Modificado por' width={100} />
                <Column dataField="modifyAt" caption='Modificado el' dataType='date'  format={formatDateTime} width={180}/>
                {/* <Column type="buttons" width={50}>
                    <ButtonGrid name="modificar"icon="edit" onClick={e => openDialog(e.row.data.id)}/>
                </Column> */}
                {/* <Editing                   
                    allowUpdating={true}
                    useIcons={true}
                >                    
                </Editing> */}
            </DataGrid>
        </div>
    );
}

export default Registers;
