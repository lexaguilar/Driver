export const _path = {
    root: '/driver'
}

const menu = [{
    layout: 'driver',
    title: 'Matriculas',
    url: `${_path.root}/registros`   
},{
    layout: 'driver',
    title: 'Arqueos',
    url: `${_path.root}/checkup`   
},{
    layout: 'driver',
    title: 'Clientes',
    url: `${_path.root}/clientes`   
},{
    layout: 'driver',
    title: 'Recibos',
    url: `${_path.root}/recibos`   
},{
    layout: 'driver',
    title: 'Configuración',
    url: `` ,
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Sucursales', url: `${_path.root}/sucursales` },
            { title: 'Instructores', url: `${_path.root}/instructores` },
            { title: 'Medios de pago', url: `${_path.root}/paymentType` },
            { title: 'Conceptos de pagos', url: `${_path.root}/concepts` },
            { title: 'Usuarios', url: `${_path.root}/usuarios` },
            { title: 'Roles', url: `${_path.root}/roles` },
            { title: 'Recursos', url: `${_path.root}/permisos` }
        ],
    },
}];


export default menu;