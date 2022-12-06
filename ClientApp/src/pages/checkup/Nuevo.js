import React, { useState, useRef, useEffect } from 'react';

import { DataGrid } from "devextreme-react";
import { Column, RequiredRule, FilterRow, Lookup, Pager, Paging, Editing, TotalItem, Summary } from 'devextreme-react/data-grid';

import { store } from '../../services/store';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { formatDate } from '../../data/app';
import uri from '../../utils/uri';
import { cellRender, cellRenderV2, formatToMoney } from '../../utils/common';
import { createStore } from '../../utils/proxy';
import http from '../../utils/http';
import moment from 'moment';
import notify from 'devextreme/ui/notify';
import CustomStore from 'devextreme/data/custom_store';

const Nuevo = (props) => {

    const { id } = props.location.state;

    const [ state, setState ] = useState({});
    const [ ingresos, setIngresos ] = useState([]);
    const [ totalEgresos, setTotalEgresos ] = useState(0);
    const [ loading, setLoading ] = useState(true);

    let dataGrid = useRef();
    let refEgresos = useRef();

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

    const calculateEgreso = (previousValue, currentValue) => previousValue + currentValue.amount; 

    const onRowInserted = (model) => {

        const data = refEgresos.current.instance.getDataSource().items();
        
        const total =    data.reduce(calculateEgreso, 0);

        setTotalEgresos(total);

    }

    const getInfoCheckup = async () => {

        var [data, ingresos, egresos] =  await Promise.all([

            http(`checkups/get/${id}`).asGet(),
            http(`receipts/get/pending/${id}`).asGet(),
            http(`discharges/get/id/${id}`).asGet()

        ]);

        const total =    egresos.reduce(calculateEgreso, 0);
       
        setTotalEgresos(total);
        setState(data);
        setIngresos(ingresos);
        setLoading(false);

    }

    useEffect(() => {
        getInfoCheckup();
    }, [0]);

    const myStore = new CustomStore({
        load: (loadOptions) => {            

            return http(`discharges/get/id/${id}`).asGet()
                .then((data) => {

                    let resp = data; 
                    return {
                        data: resp,
                        totalCount: resp.length,
                    };
                })
                .catch(() => { throw 'Data Loading Error'; });
        },
        insert: (data) => {

            data.checkupId = id;
            
            return new Promise((resolve,reject) =>
                http(`discharges/post`).asPost(data).then(result => {
                    notify('Registro agregado');
                    resolve(result);
                }).catch(err => {
                    notify(err, 'error');
                    reject(err);                        
                })
            )
        },
        update: (data, dataModificada) => {

            dataModificada.checkupId = id;

            return new Promise((resolve,reject) =>
                http(`discharges/post`).asPost({...data, ...dataModificada }).then(result => {
                    notify('Registro actualizado');
                    resolve(result);
                }).catch(err => {
                    notify(err, 'error');
                    reject(err);                        
                })

            )
        },
        remove: catalogo => {
            return new Promise((resolve,reject) =>
                http(`discharges/get/${catalogo.id}/delete`).asGet().then(result => {
                    notify('Registro eliminado');
                    resolve(result);
                }).catch(err => {
                    notify(err, 'error');
                    reject(err);                        
                })
            )
        },
        byKey: _id => http(`discharges/get/${_id}/delete`).asGet()

    });

    const title = 'Arqueos';

    const sum = att => (previousValue, currentValue) => previousValue + currentValue[att];

    const sumTarjeta = sum('tarjeta');
    const sumEfectivo = sum('efectivo');
    const sumTransferencia = sum('transferencia');
    
    const totalTarjeta = ingresos.reduce(sumTarjeta,0);
    const totalEfectivo = ingresos.reduce(sumEfectivo,0);
    const totalEfectivoC$ = totalEfectivo * state.rate;
    const totalTransferencia = ingresos.reduce(sumTransferencia,0);

    const total = totalTarjeta + totalEfectivo + totalTransferencia;

    return ( 
    
            <div className="container">
                
                <Title title={title} />
                <BlockHeader title={title} />
                
                {loading ? <div>Cargando...</div> : 

                <div>             
                    <div>Arqueo #{id}-<b>{state?.area?.name}</b> desde <b>{moment(state.dateInit).format('DD-MM-YYYY')}</b> hasta <b>{moment(state.dateEnd).format('DD-MM-YYYY')}</b></div>
                    <div style={{ display: '-webkit-box', width: '100%', overflowY: 'scroll' }}>
                        <div style={{ width:'800px', padding:'5px' }}>
                            <label htmlFor="">Ingresos</label>
                            <DataGrid id="gridContainer"
                                className='grid-small'
                                ref={dataGrid}
                                selection={{ mode: 'single' }}
                                dataSource={ingresos}
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
                                <Column dataField="reference" caption="Recibo" width={90} />
                                <Column dataField="name" caption="Cliente" />
                                <Column dataField="concept" caption="Concepto" />
                                <Column dataField="tarjeta" width={90} cellRender={cellRenderV2()} />
                                <Column dataField="transferencia" caption={'Deposito'} width={90} cellRender={cellRenderV2()} />
                                <Column dataField="efectivo" width={90} cellRender={cellRenderV2()} />
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
                        <div style={{ padding:'5px' }}>
                            <label htmlFor="">Egresos</label>
                            <DataGrid id="gridContainer2"
                                className='grid-small'
                                selection={{ mode: 'single' }}
                                ref={refEgresos}
                                dataSource={myStore}
                                showBorders={true}
                                showRowLines={true}
                                allowColumnResizing={true}
                                columnHidingEnabled={true}
                                allowColumnReordering={true}
                                hoverStateEnabled={true}
                                columnAutoWidth={true}
                                onCellPrepared={onCellPrepared}
                                onRowInserted={onRowInserted}
                            
                            >
                                <Paging defaultPageSize={10} />
                                <Pager
                                    showInfo={true}
                                    showPageSizeSelector={true}
                                    allowedPageSizes={[10, 30, 50, 100]}
                                />
                                <FilterRow visible={true} />
                                <Column dataField="date" caption="Fecha" dataType='date' format={formatDate} width={100} alignment="right" >
                                <RequiredRule />
                                </Column>
                                <Column dataField="dischargeTypeId" caption="Egreso" width={90} >
                                    <Lookup dataSource={createStore({ name: 'DischargeType' })} valueExpr="id" displayExpr="name" ></Lookup>
                                    <RequiredRule />
                                </Column>
                                <Column dataField="amount" width={100}  caption="Monto" cellRender={cellRender(1)}dataType='number'><RequiredRule /></Column>
                                <Column dataField="observation"  width={180} caption="Observación" hidingPriority={9} />
                                <Editing
                                    mode="row"
                                    allowUpdating={true}
                                    allowAdding={true}
                                    allowDeleting={true}
                                    selectTextOnEditStart={true}
                                    useIcons={true}
                                />
                                <Summary>
                                    <TotalItem
                                        column="amount"
                                        summaryType="sum"
                                        customizeText={data => formatToMoney(data.value)}
                                    />                           
                                </Summary>
                            </DataGrid>
                        </div>                       
                    </div>
                    <div>
                        <table style={{ width:'350px' }}>
                            <tr><td className='w-150' align='center' colSpan={2}>Total Ingresos</td></tr>
                            <tr><td className='w-150'>Tarjeta</td><td align='right'>{formatToMoney(totalTarjeta)}</td></tr>
                            <tr><td className='w-150'>Transferencia</td><td align='right'>{formatToMoney(totalTransferencia)}</td></tr>
                            <tr><td className='w-150'>Efectivo</td><td align='right'>{formatToMoney(totalEfectivo)} / {formatToMoney(totalEfectivoC$, 1 )}</td></tr>
                            <tr><td className='w-150'><b>Total</b></td><td align='right'><b>{formatToMoney(total)}</b></td></tr>
                        </table>
                        <table style={{ width:'350px' }}>
                            <tr><td className='w-150' align='center' colSpan={2}>Total Egresos</td></tr>
                            <tr><td className='w-150'>Egresos</td><td className='item-stock-zero' align='right'>{formatToMoney(totalEgresos, 1)}</td></tr>
                            <tr><td className='w-150'>Efectivo en caja</td><td align='right'><b>{formatToMoney(totalEfectivoC$ - totalEgresos, 1)}</b></td></tr>
                        </table>
                    </div>
                </div>
                }
            </div>
        
    );
}

export default Nuevo;


