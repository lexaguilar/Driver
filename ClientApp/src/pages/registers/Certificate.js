import React, { useEffect, useState } from 'react';
import { Popup } from 'devextreme-react';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import Form, { GroupItem, Label, SimpleItem } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux';
import { editorOptionsSwitch, formatDate, formatDateTime } from '../../data/app';
import { certificateDialog } from '../../store/certificate/certificateReducer';
import http from '../../utils/http';
import uri from '../../utils/uri';
import notify from 'devextreme/ui/notify';

const Certificate = () => {

    const dispatch = useDispatch();
    const { certificate: { open, id } } = useSelector(store => store);
    
    const closeDialog = (load) => dispatch(certificateDialog({ open: false, id: 0 }));

    const onHiding = ({ load }) => closeDialog(load);    

    return (
        <div>
            <Popup
                // width={650}
                // height={650}
                showTitle={false}
                title={`Certificado #${id}`}
                onHiding={onHiding}
                visible={open}
                closeOnOutsideClick={true}
                className="bg-fbfbfb"
            >
               <div id="box">
                    <div class="corner top-left"></div>
                    <div class="corner top-right"></div>
                    <div class="corner bottom-left"></div>
                    <div class="corner bottom-right"></div>
                </div>

            </Popup>
        </div>
    );
}

export default Certificate;
