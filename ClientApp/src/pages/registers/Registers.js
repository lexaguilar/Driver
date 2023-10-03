import { DataGrid, Switch } from 'devextreme-react';
import { Column, Export, FilterRow, Lookup, Pager, Paging, ColumnChooser, Selection } from 'devextreme-react/data-grid';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { dataAccess, formatDate, formatDateTime, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';
import { store } from '../../services/store';
import { registerDialog } from '../../store/register/registerReducer';
import { calificationDialog } from '../../store/calification/calificationReducer';
import { cancelRegisterDialog } from '../../store/cancelRegister/cancelRegisterReducer';
import { detailsDialog } from '../../store/details/detailsReducer';
import { receiptDialog } from '../../store/receipt/receiptReducer';
import { claseDialog } from '../../store/clases/claseReducer';
import { cellRenderBold, copyText } from '../../utils/common';
import { createStore } from '../../utils/proxy';
import urlReport from '../../services/reportServices';
import uri from '../../utils/uri';
import Nuevo from './Nuevo';
import Calification from './Calification';
import DialogCancel from './DialogCancel';
import Details from './Details';
import Recibo from './Recibo';
import Certificate from './Certificate';
import PlanClase from './PlanClase';

const Registers = (props) => {
    console.log(props)

    const dispatch = useDispatch();
    const [viewComplete, setViewComplete] = useState(true);
    const { user } = useSelector(store => store);

    const { authorized } = useAuthorization([resources.matriculas, dataAccess.access]);
    const { isAuthorization } = useAuthorization([resources.verSucursales, dataAccess.access]);

    let dataGrid = useRef();

    const onToolbarPreparing = (e) => {
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Nueva matricula',
                icon: 'plus',
                type: 'default',
                stylingMode: "outlined",
                onClick: () => openDialog(0)
            },
        });
    }

    const load = () => dataGrid.current.instance.refresh();

    const openDialog = id => dispatch(registerDialog({ open: true, id }));
    const openDialogCalification = id => dispatch(calificationDialog({ open: true, id }));
    const openDialogCancelRegister = id => dispatch(cancelRegisterDialog({ open: true, id }));
    const openDialogDetails = id => dispatch(detailsDialog({ open: true, id }));
    const openDialogReceipt = id => dispatch(receiptDialog({ open: true, id }));
    const openDialogClase = id => dispatch(claseDialog({ open: true, id }));

    const addMenuItems = (e) => {

        if (e.target == "content") {
            if (!e.items) e.items = [];

            e.items.push({
                text: `Registrar notas`,
                icon: 'edit',
                onItemClick: () => openDialogCalification(e.row.data.id)
            }, {
                text: `Plan de Clases`,
                icon: 'doc',
                onItemClick: () => {
                    props.history.push(`/driver/plan-clases-review`, { id: e.row.data.clientId });
                }
            }, {
                text: `Detalles`,
                icon: 'bulletlist',
                onItemClick: () => openDialogDetails(e.row.data.id)
            }, {
                text: `Generar recibo de pago`,
                icon: 'money',
                onItemClick: () => openDialogReceipt(e.row.data.id)
            }, {
                text: `Imprimir certificado`,
                icon: 'doc',
                onItemClick: () => {

                    const report = urlReport();
                    report.print(`${report.certificate(e.row.data.id)}`);

                }
            }, {
                text: `Anular matricula`,
                icon: 'remove',
                onItemClick: () => openDialogCancelRegister(e.row.data.id)
            }, {
                text: `Copiar`,
                icon: 'unselectall',
                onItemClick: () => copyText(e.row.values[e.columnIndex])
            });
        }
    }

    const onCellPrepared = e => {

        const cellsQuantity = ['payoff']

        if (e.rowType == 'data') {
            if (cellsQuantity.includes(e.column.dataField))
                if (e.row.data.payoff)
                    e.cellElement.classList.add('pagada');
                else
                    e.cellElement.classList.add('pendiente');

            if (e.column.dataField == 'code')
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

   

    const addExtraParameter = () => {

        const extraParameter = [];

        if (viewComplete)
            extraParameter.push(["active", viewComplete]);

        if (!isAuthorization)
            extraParameter.push(["areaId", user.areaId]);

        return extraParameter;
    };

    const onExporting = function(e){  
        e.component.beginUpdate();  
        e.component.columnOption("areaId","visible",false);  
        e.component.columnOption("phoneNumber","visible",false);  
        e.component.columnOption("typeLicenceId","visible",false);  
        e.component.columnOption("instructorId","visible",false);  
        e.component.columnOption("createAt","visible",false);  
        e.component.columnOption("createBy","visible",false);  
        e.component.columnOption("modifyAt","visible",false);  
        e.component.columnOption("modifyBy","visible",false);  
        e.component.columnOption("identification","visible",false);  
        e.component.columnOption("total","visible",false);  
        e.component.columnOption("abonos","visible",false);  
        e.component.columnOption("payoff","visible",false);  
        
        e.component.columnOption("id2","visible",true);  
        e.component.columnOption("endDate","visible",true);  
        e.component.columnOption("noteTheoretical","visible",true);  
        e.component.columnOption("notePractice","visible",true);  
        e.component.columnOption("folio","visible",true);  
        e.component.columnOption("book","visible",true);  

        e.component.columnOption("id","caption","Codigo de Ingreso");  
        e.component.columnOption("startDate","caption","Fecha Inicio");   

    };

    const onExported= function(e){  
        e.component.columnOption("areaId","visible",true);  
        e.component.columnOption("phoneNumber","visible",true);  
        e.component.columnOption("typeLicenceId","visible",true);  
        e.component.columnOption("instructorId","visible",true);  
        e.component.columnOption("createAt","visible",true);  
        e.component.columnOption("createBy","visible",true);  
        e.component.columnOption("modifyAt","visible",true);  
        e.component.columnOption("modifyBy","visible",true);  
        e.component.columnOption("identification","visible",true);  
        e.component.columnOption("total","visible",true);  
        e.component.columnOption("abonos","visible",true);  
        e.component.columnOption("payoff","visible",true);  
        
        e.component.columnOption("id2","visible",false);  
        e.component.columnOption("endDate","visible",false);  
        e.component.columnOption("noteTheoretical","visible",false);  
        e.component.columnOption("notePractice","visible",false);  
        e.component.columnOption("folio","visible",false);  
        e.component.columnOption("book","visible",false);  

        e.component.columnOption("id","caption","Codigo");  
        e.component.columnOption("startDate","caption","Inicio");  

        e.component.endUpdate();  
    };  

    const title = 'Matriculas';

    return authorized(
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title}>
                <div>
                    <span >Mostrar solo registros activos?: </span>
                    <Switch defaultValue={true}
                        switchedOffText="NO"
                        switchedOnText="SI"
                        onValueChange={value => {
                            setViewComplete(value)
                        }}
                    />
                </div>
            </BlockHeader>

            <Nuevo onSave={load} />
            <Calification onSave={load} />
            <DialogCancel onCancel={load} />
            <Recibo onSave={load} />
            <Details />
            <Certificate />

            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.registers, remoteOperations: true, extraParameter : addExtraParameter() })}
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
                onExporting={onExporting}
                onExported={onExported}
                
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}
            >
                <Paging defaultPageSize={10} />
                <Pager
                    showInfo={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50, 100, 500, 1000]}
                />
                <ColumnChooser enabled={true} />
                <FilterRow visible={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={false}/>
                <Column visible={false} dataField="id"/>
                <Column dataField="code" caption="Codigo" width={70} hidingPriority={7} />
                <Column dataField="id2" caption="Codigo de Egreso" visible={false} />
                <Column dataField="areaId" hidingPriority={6} caption="Sucursal" width={90} allowFiltering={isAuthorization} >
                    <Lookup dataSource={createStore({ name: 'Area' })} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>
                <Column dataField="identification" width={140} caption="Identificacion" />
                <Column dataField="name" caption="Nombre completo" />
                <Column dataField="age" caption="Edad" width={65} />
                <Column dataField="phoneNumber" hidingPriority={4} width={90} caption="Telefono" allowFiltering={false} />
                <Column dataField="typeLicenceId" caption="Tipo" width={120}>
                    <Lookup dataSource={createStore({ name: 'TypeLicence' })} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>
                <Column dataField="categories" caption="Categorias" width={90} allowFiltering={false} alignment="right" />
                <Column dataField="startDate" caption="Inicio" dataType='date' format={formatDate} width={100} alignment="right" />
                <Column dataField="total" width={90} cellRender={cellRenderBold()} />
                <Column dataField="abonos" caption="Pagado" width={90} cellRender={cellRenderBold()} allowFiltering={false} />
                <Column dataField="payoff" width={90} caption='Pagada' dataType="boolean" cellRender={cellAsPayoff} alignment="right" />

                <Column dataField="instructorId" hidingPriority={3} caption="Instructor" width={150}>
                    <Lookup dataSource={createStore({ name: 'Instructor' })} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>
                <Column dataField="createAt" hidingPriority={5} caption='Creado el' dataType='date' format={formatDate} width={100} />
                <Column dataField="createBy" hidingPriority={2} caption='Creado por' width={100} />
                <Column dataField="modifyAt" hidingPriority={0} caption='Modificado el' dataType='date' format={formatDateTime} width={180} />
                <Column dataField="modifyBy" hidingPriority={1} caption='Modificado por' width={100} />

                <Column dataField="endDate" caption="Fecha Finalizacion"  dataType='date' visible={false} format={formatDate}/>
                <Column dataField="noteTheoretical" caption="Nota teorica" visible={false} />
                <Column dataField="notePractice" caption="Nota practica" visible={false} />
                <Column dataField="folio" caption="Folio" visible={false} />
                <Column dataField="book" caption="Libro" visible={false} />

            </DataGrid>
        </div>
    );
}

export default Registers;
