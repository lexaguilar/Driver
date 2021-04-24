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
import { cellRender, cellRenderBold } from '../../utils/common';
import { createStore } from '../../utils/proxy';
import uri from '../../utils/uri';
import Nuevo from './Nuevo';

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

    const openDialog = id => {
        dispatch(registerDialog({ open: true, id}));
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
                e.cellElement.classList.add('col-id-factura');  
        }
    
    }

    const cellAsPayoff = data => {    
        return <b>{data.value ? 'Pagada' : 'Pendiente'}</b>;
    }  

    const title = 'Matriculas';
    
    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>     
            <Nuevo onSave={load}/>     
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
                <Column dataField="id" visible={false}/>
                <Column dataField="areaId" caption="Sucursal" width={100}>
                    <Lookup dataSource ={createStore({name: 'Area'})} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>
                <Column dataField="identification" width={140} caption="Identificacion" />
                <Column dataField="name" caption="Nombre completo" />
                <Column dataField="phoneNumber" width={90} caption="Telefono" allowFiltering={false} />
                <Column dataField="typeLicenceId" caption="Tipo" width={120}>
                    <Lookup dataSource ={createStore({name: 'TypeLicence'})} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>
                <Column dataField="categories" caption="Categorias" width={75} allowFiltering={false}/>
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
                <Column dataField="modifyAt" caption='Modificado por' width={100} />
                <Column dataField="modifyBy" caption='Modificado el' dataType='date'  format={formatDateTime} width={180}/>
                <Column type="buttons" width={50}>
                    <ButtonGrid name="modificar"icon="edit" onClick={e => openDialog(e.row.data.id)}/>
                </Column>
                <Editing                   
                    allowUpdating={true}
                    useIcons={true}
                >                    
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Registers;
