import React, { useEffect, useRef, useState } from 'react';
import Form, {
    ButtonItem,
    SimpleItem,
    GroupItem,
    Label,
    EmailRule,
    RequiredRule,
    AsyncRule,
    
} from 'devextreme-react/form';
import useAuthorization from '../../hooks/useAuthorization';
import { Button, NumberBox, Validator } from 'devextreme-react';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';
import { useSelector,useDispatch } from 'react-redux';
import { setAppInfo } from '../../store/app/appActions';
import { DivFormColumns } from '../../components/form/DivForm';
import { dataAccess, editorOptionsNumberBox, resources } from '../../data/app';

const App = () => {

    const { authorized } = useAuthorization([resources.app, dataAccess.access ]);
    const [saving, setSaving] = useState({
        loading : false,
        text : 'Guardar'
    });

    const dispatch = useDispatch();
    const { appInfo } = useSelector(store => store); 

    const [app, setApp] = useState({...appInfo});   

    const onFormSubmit = (e) => {

        e.preventDefault();

        setSaving({loading : true, text:'Guardando...'});
        http('about/set-info').asPost(app).then(resp => {

            notify('Datos actualizados');
            setSaving({loading : false, text:'Guardar'});
            dispatch(setAppInfo(app));
            
        }).catch(err => {

            notify(err, 'error');
            setSaving({loading : false, text:'Guardar'});

        });
    }

    useEffect(() => {
        setApp({...app, ...appInfo});
    }, [appInfo]);

    return authorized(
        <div className="container small">
            <form onSubmit={onFormSubmit}>
                <div className="dx-fieldset">
                    <div className="dx-fieldset-header">Configuracion de cursos</div>
                    <DivFormColumns title='Precio del curso'
                        description="Ingrese el precio del curso">                        
                        <NumberBox                            
                            value={app.price}                           
                            onValueChanged={e => setApp(app => ({ ...app, price: e.value }))}
                            {...editorOptionsNumberBox}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </NumberBox>
                    </DivFormColumns>
                    <Button 
                        icon='save'
                        text={saving.text} 
                        disabled={saving.loading}
                        type="default"                     
                        useSubmitBehavior={true}>
                    </Button>
                </div>
            </form>           
        </div>
    );
}

export default App;
