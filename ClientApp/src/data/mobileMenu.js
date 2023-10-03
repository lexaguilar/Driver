import { _path } from './headerNavigation';

export default [
    {
        layout: 'driver',
        type: 'link',
        label: 'Matriculas',
        url: `${_path.root}/registros`  
    },{
        layout: 'driver',
        type: 'link',
        label: 'Arqueos',
        url: `${_path.root}/checkup`   
    },{
        layout: 'driver',
        type: 'link',
        label: 'Clientes',
        url: `${_path.root}/clientes`    
    },{
        layout: 'driver',
        type: 'link',
        label: 'Recibos',
        url: `${_path.root}/recibos`   
    },{
        layout: 'driver',
        type: 'link',
        label: 'Clases',
        url: `${_path.root}/plan-de-clases`   
    },{
        type: 'link',
        label: 'Configuración',
        url: '',
        children: [
            { type: 'link', label: 'Sucursales', url: `${_path.root}/sucursales` },
            { type: 'link', label: 'Instructores', url: `${_path.root}/instructores` },
            { type: 'link', label: 'Medios de pago', url: `${_path.root}/paymentType` },
            { type: 'link', label: 'Tipos de egresos', url: `${_path.root}/dischargeTypes` },
            { type: 'link', label: 'Conceptos de pagos', url: `${_path.root}/concepts` },
            { type: 'link', label: 'Usuarios', url: `${_path.root}/usuarios` },
            { type: 'link', label: 'Roles', url: `${_path.root}/roles` },
            { type: 'link', label: 'Recursos', url: `${_path.root}/permisos` }

        ],
    },   
];
