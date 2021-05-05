import { DataGrid } from 'devextreme-react';
import { Column, Editing, Export, FilterRow, Form, HeaderFilter, Lookup, Pager, Paging, Popup } from 'devextreme-react/data-grid';
import { Item, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import React, { useRef } from 'react';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { dataAccess, editorOptionsSwitch, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';
import { store } from '../../services/store';
import { copyText } from '../../utils/common';
import uri from '../../utils/uri';

const Clients = () => {

    const { authorized } = useAuthorization([resources.clientes, dataAccess.access ]);

    let dataGrid = useRef();

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


    const title = 'Clientes'
    
    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>          
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.clients, remoteOperations : true})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onToolbarPreparing={onToolbarPreparing}
                onContextMenuPreparing={addMenuItems}
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
                <FilterRow visible={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="identification" caption="Identificacion"  width={140}/>
                <Column dataField="name" caption="Nombre completo" />             
                <Column dataField="phoneNumber" width={110} caption="Telefono" />
                <Column dataField="celularNumber" width={110} caption="Celular" />
                <Column dataField="address" caption="Direccion" allowFiltering={false} />

                <Editing
                    mode="popup"
                    allowUpdating={true}
                    useIcons={true}
                >
                    <Popup title={title} showTitle={true} width={450} height={470}>
                        
                    </Popup>
                    <Form>
                        <Item  dataField="identification"  colSpan={2}>
                            <RequiredRule message="El campo es requerida"/>
                        </Item>  
                        <Item  dataField="name" caption="Nombre" colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                            <StringLengthRule max={100} min={2} message="Máximo de caracteres 100 y 2 mínimo"/>
                        </Item>                        
                        <Item  dataField="phoneNumber" editorOptions={{mask: "0000-0000"}} colSpan={2}></Item>  
                        <Item  dataField="celularNumber"  editorOptions={{mask: "0000-0000"}} colSpan={2}></Item>  
                        <Item  dataField="address"  colSpan={2} editorType="dxTextArea">
                            <StringLengthRule max={250} message="Maximo de carateres permitidos 250" />
                        </Item>  
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Clients;
