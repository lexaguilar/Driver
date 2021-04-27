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
        label: 'Clientes',
        url: `${_path.root}/clientes`    
    },{
        layout: 'driver',
        type: 'link',
        label: 'Recibos',
        url: `${_path.root}/recibos`   
    },{
        type: 'link',
        label: 'Configuración',
        url: '',
        children: [
            { type: 'link', label: 'Sucursales', url: `${_path.root}/sucursales` },
            { type: 'link', label: 'Instructores', url: `${_path.root}/instructores` },
            { type: 'link', label: 'Usuarios', url: `${_path.root}/usuarios` },
            { type: 'link', label: 'Roles', url: `${_path.root}/roles` },
            { type: 'link', label: 'Recursos', url: `${_path.root}/permisos` }

        ],
    },   
];
