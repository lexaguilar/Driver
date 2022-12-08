import React, { useState, useRef } from 'react';

import { Box, DataGrid, DateBox, DropDownBox, SelectBox } from "devextreme-react";
import { Column, FilterRow, Button, Pager, Paging, Editing, Form, Popup, Lookup } from 'devextreme-react/data-grid';
import { Item, RequiredRule, StringLengthRule } from 'devextreme-react/form';

import { store } from '../../services/store';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { editorOptionsSwitch, formatDate, formatDateTime } from '../../data/app';
import uri from '../../utils/uri';
import { cellRender, cellRenderBold, cellRenderV2, formatToMoney } from '../../utils/common';
import { createStore } from '../../utils/proxy';
import { userService } from '../../services/user.service';

const Checkup = (props) => {

    //const [ param, setParam ] = useState({});

    const user = userService.getUser();

    let dataGrid = useRef();
  

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

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Crear nuevo',
                icon:'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  dataGrid.current.instance.addRow()
            }
        });
    }  

    const title = 'Arqueos';

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.checkups })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                columnHidingEnabled={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                columnAutoWidth={true}
                onCellPrepared={onCellPrepared}
                onToolbarPreparing={onToolbarPreparing}
            >
                <Paging defaultPageSize={10} />
                <Pager
                    showInfo={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 30, 50, 100]}
                />
                <FilterRow visible={true} />
                <Column dataField="name" caption="Nombre"  width={200} />
                <Column dataField="dateInit" caption="Desde" dataType='date' format={formatDate} width={150} alignment="right" />
                <Column dataField="dateEnd" caption="Hasta" dataType='date' format={formatDate} width={150} alignment="right" />
                <Column dataField="rate" caption="Tasa Cambio"  width={120} cellRender={cellRenderBold()} />
                {/* <Column dataField="totalIn" caption="Total Ingresos"  width={120} cellRender={cellRenderBold()} />
                <Column dataField="totalOut" caption="Total Egresos"  width={120} cellRender={cellRenderBold()} />
                <Column dataField="balance" caption="Balance"  width={120} cellRender={cellRenderBold()} /> */}
                <Column dataField="isClosed" dataType='boolean' caption="Cerrado"  width={120} />
                <Column dataField="areaId" caption="Sucursal"  width={120} >
                    <Lookup dataSource={createStore({ name: 'Area' })} valueExpr="id" displayExpr="name" ></Lookup>
                </Column>

                <Column dataField="createAt" caption='Creado el' dataType='date' format={formatDateTime} />
                <Column dataField="createBy" caption='Creado por' width={100} />
                <Column dataField="modifyAt" caption='Modificado el' dataType='date' format={formatDateTime} />
                <Column dataField="modifyBy" caption='Modificado por' width={100} />
                <Column type='buttons'>
                    <Button name='edit' />                  
                    <Button icon='menu'
                        onClick={e => {

                            const { id } = e.row.data;  
                            props.history.push('/driver/checkup/details', { id });

                        }}
                    />
                </Column>
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    useIcons={true}
                >
                    <Popup title={title + ' Sucursal ' + user.area } showTitle={true} width={400} height={360}>
                        
                    </Popup>
                    <Form>
                        <Item  dataField="name" colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                            <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo"/>
                        </Item>
                        <Item  dataField="dateInit" editorType='dxDateBox' colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                        </Item>
                        <Item  dataField="dateEnd" editorType='dxDateBox' colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                        </Item>
                        <Item  dataField="rate" editorType='dxNumberBox' colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                        </Item>                      
                        <Item  visible={false} dataField="areaId" colSpan={2} >
                            <RequiredRule message="La sucursal es requerida"/>
                        </Item>                      
                        <Item visible={false}  dataField="isClosed"  editorType="dxSwitch" editorOptions={{...editorOptionsSwitch}}  colSpan={2}>
                        </Item> 
                    </Form>
                </Editing>


            </DataGrid>
        </div>
    );
}

export default Checkup;
