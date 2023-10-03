export const editorOptions = { stylingMode: "filled" };

export const editorOptionsSelect = {
    valueExpr: "id",
    displayExpr: "name",
    searchEnabled: true
}


export const editorOptionsSwitch = {
    switchedOffText:"NO",
    switchedOnText:"SI",
}

export const editorOptionsNumberBox={
    showSpinButtons:true,   
}

export const editorOptsTextBoxPhone={
    mask: "0000-0000"
}

export const editorOptsTextBox={
    showClearButton:true
}

export const formatDateTime = 'dd/MM/yyyy hh:mm a';
export const formatDate = 'dd/MM/yyyy';


export const resources = {
    clientes : 1,
    matriculas : 2,
    recibos : 3,
    usuarios : 4,
    sucursales : 5,
    instructores : 6,
    app: 7,
    verSucursales:8,
    registrarClases:9,
}

export const dataAccess = {
    none : 0x0,
    access : 0x01,
    create : 0x02,
    update : 0x04,
    delete : 0x08
}