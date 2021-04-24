import { DataGrid } from 'devextreme-react';
import { Column, Editing, Export, FilterRow, Form, HeaderFilter, Lookup, Pager, Paging, Popup } from 'devextreme-react/data-grid';
import { Item, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import React, { useRef } from 'react';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { dataAccess, editorOptionsSwitch, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';
import { store } from '../../services/store';
import uri from '../../utils/uri';

const Instructors = () => {

    const { authorized } = useAuthorization([resources.instructores, dataAccess.access ]);

    let dataGrid = useRef();

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Agregar nuevo',
                icon:'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  dataGrid.current.instance.addRow()
            }
        });
    }  

    const onInitNewRow = (e) => {
        e.data.active = true;
    }

    const title = 'Instructores'
    
    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>          
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.instructors, remoteOperations : true})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onToolbarPreparing={onToolbarPreparing}
                onInitNewRow={onInitNewRow}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id" caption="Codigo" width={150}/>             
                <Column dataField="name" caption="Nombre completo" />             
                <Column dataField="phoneNumber" width={110} caption="Telefono" />
                <Column dataField="observation" caption="Direccion" allowFiltering={false} />
                <Column dataField="active" caption="Activo"  width={150} />

                <Editing
                    mode="popup"
                    allowUpdating={true}
                    useIcons={true}
                >
                    <Popup title={title} showTitle={true} width={450} height={380}>
                        
                    </Popup>
                    <Form>                       
                        <Item  dataField="name" caption="Nombre" colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                            <StringLengthRule max={100} min={2} message="Máximo de caracteres 100 y 2 mínimo"/>
                        </Item>
                        <Item  dataField="phoneNumber" editorOptions={{mask: "0000-0000"}} colSpan={2}></Item>  
                        <Item  dataField="observation"  colSpan={2} editorType="dxTextArea"></Item>  
                        <Item  dataField="active"  editorType="dxSwitch" editorOptions={{...editorOptionsSwitch}}  colSpan={2}>
                        </Item> 
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Instructors;
