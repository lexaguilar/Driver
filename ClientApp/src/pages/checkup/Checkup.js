import React, { useState, useRef } from 'react';

import { Box, DataGrid, DateBox, DropDownBox, SelectBox } from "devextreme-react";
import { Column, Export, FilterRow, Lookup, Pager, Paging, ColumnChooser, TotalItem, Summary } from 'devextreme-react/data-grid';

import { store } from '../../services/store';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { formatDate } from '../../data/app';
import uri from '../../utils/uri';
import { cellRender, cellRenderV2, formatToMoney } from '../../utils/common';

const Checkup = () => {

    //const [ param, setParam ] = useState({});

    let dataGrid = useRef();

    const onRowPrepared = (e) => {
        if (e.rowType == 'data') {

            if (!e.data.active)
                e.rowElement.classList.add('no-activo');

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

    const title = 'Arqueos';    

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title}/>
            {/* <DateBox type="date" displayFormat={formatDate} openOnFieldClick={true} /> */}
            <div>
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: { get : 'receipts/get/pending' }  })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                columnHidingEnabled={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                columnAutoWidth={true}
                onCellPrepared={onCellPrepared}
                onRowPrepared={onRowPrepared}                
               
            >
                <Paging defaultPageSize={10} />
                <Pager
                    showInfo={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 30, 50, 100]}
                />
                <FilterRow visible={true} />
                <Column dataField="date" caption="Fecha" dataType='date' format={formatDate} width={100} alignment="right" />
                <Column dataField="reference" caption="Recibo" width={90}/>
                <Column dataField="name" caption="Cliente" />
                <Column dataField="concept" caption="Concepto" />
                <Column dataField="tarjeta" width={90} cellRender={cellRenderV2()}/>
                <Column dataField="transferencia" caption={'Deposito'} width={90} cellRender={cellRenderV2()}/>
                <Column dataField="efectivo" width={90} cellRender={cellRenderV2()}/>
                <Summary>
                <TotalItem
                    column="efectivo"
                    summaryType="sum" 
                    customizeText={data => formatToMoney(data.value)}
                    />
                <TotalItem
                    column="transferencia"
                    summaryType="sum" 
                    customizeText={data => formatToMoney(data.value)}
                    />
                <TotalItem
                    column="tarjeta"
                    summaryType="sum" 
                    customizeText={data => formatToMoney(data.value)}
                    />
                </Summary>
              

            </DataGrid>
            </div>
            <div></div>
        </div>
    );
}

export default Checkup;
