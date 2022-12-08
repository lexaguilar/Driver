import { DataGrid } from 'devextreme-react';
import { Column, Editing, Export, FilterRow, Form, HeaderFilter, Pager, Paging, Popup } from 'devextreme-react/data-grid';
import { Item, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import React, { useRef } from 'react';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { dataAccess, editorOptionsSwitch, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';
import { store } from '../../services/store';
import uri from '../../utils/uri';

const Areas = () => {   

    const { authorized } = useAuthorization([resources.sucursales, dataAccess.access ]);

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

    const onInitNewRow = (e) => {
        e.data.active = true;
    }

    const title = 'Sucursales'
    
    return authorized(
        <div className="container small">
            <Title title={title}/>
            <BlockHeader title={title}/>          
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.areas})}
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
                <HeaderFilter visible={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="name" caption="Descripcion" />
                <Column dataField="active" caption="Activo" dataType="boolean" width={100} />
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    useIcons={true}
                >
                    <Popup title={title} showTitle={true} width={450} height={250}>
                        
                    </Popup>
                    <Form>
                        <Item  dataField="name" editorOptions={{ width:300 }} colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                            <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo"/>
                        </Item>
                        <Item  dataField="active"  editorType="dxSwitch" editorOptions={{...editorOptionsSwitch}}  colSpan={2}>
                        </Item>  
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Areas;
