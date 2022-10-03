import { DataGrid } from 'devextreme-react';
import { Column, Editing, Export, FilterRow, Lookup, Pager, Paging, Button as ButtonGrid, ColumnChooser } from 'devextreme-react/data-grid';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { dataAccess, formatDate, formatDateTime, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';
import { store } from '../../services/store';
import { cellRenderBold, copyText } from '../../utils/common';
import { createStore } from '../../utils/proxy';
import urlReport from '../../services/reportServices';
import uri from '../../utils/uri';


import http from '../../utils/http';


const ReceiptsPreview = ({ isPreview = false, registerId = 0 }) => {

    const dispatch = useDispatch();

    const { authorized } = useAuthorization([resources.recibos, dataAccess.access ]);

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
                //onClick: () =>  openDialog(0)
            }
        });
    }  

    

    const load = () => dataGrid.current.instance.refresh();  

    const addMenuItems = (e) => {

        if (e.target == "content") {
            if (!e.items) e.items = [];
 
            e.items.push({
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

    const extraParameter = registerId > 0 ? { key : 'registerId', value : registerId } : null;

    const title = 'Recibos';
    
    return authorized(
        <div>
            <Title title={title}/>
            {!isPreview && <BlockHeader title={title}/>}

            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.receipts, remoteOperations : true, extraParameter})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                columnHidingEnabled={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                columnAutoWidth={true}
                onCellPrepared={onCellPrepared}
                //onToolbarPreparing={onToolbarPreparing}
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
                <ColumnChooser enabled={!isPreview} />
                <FilterRow visible={true} />
                <Export enabled={!isPreview} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id" caption="Codigo #"  width={80}/>
                <Column dataField="areaId" caption="Sucursal" width={100}>
                    <Lookup dataSource ={createStore({name: 'Area'})} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>
                <Column dataField="date" caption="Fecha" dataType='date' format={formatDate} width={100} />          
                <Column dataField="identification" width={140} caption="Identificacion" visible={!isPreview}/>
                <Column dataField="name" caption="Nombre completo" visible={!isPreview} />
                <Column dataField="reference" caption="Recibo" width={90}/>
                <Column dataField="amount" caption="Pagado" width={90} cellRender={cellRenderBold()}/>
                <Column dataField="balance" caption="Pendiente" width={90} cellRender={cellRenderBold()}/>
                <Column dataField="observation" caption='Observacion' />
                <Column dataField="paymentType" caption='Tipo Pago' />
                <Column dataField="createBy" caption='Creado por' width={100} />
                <Column dataField="createAt" caption='Creado el' dataType='date'  format={formatDateTime} width={180}/>             
            </DataGrid>
        </div>
    );
}

export default ReceiptsPreview;
