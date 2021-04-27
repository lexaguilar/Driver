// react
import React from 'react';

// third-party
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './home/HomePage';

// application
import Footer from './footer';
import Header from './header';
import MobileHeader from './mobile/MobileHeader';
import MobileMenu from './mobile/MobileMenu';

import { _path } from '../data/headerNavigation';
import PrivateRoute from './header/PrivateRouter';
import Registers from '../pages/registers/Registers';
import Clients from '../pages/clients/Clients';
import Areas from '../pages/areas/Areas';
import Users from '../pages/users/Users';
import Receipts from '../pages/receipts/Receipts';
import Instructors from '../pages/instructors/Instructors';
import App from '../pages/app/App';
import Resources from '../pages/resources';
import Roles from '../pages/roles';


function Layout(props) {
    const { headerLayout } = props;

    let prop = (path, component) => ({exact:true, path : `${_path.root}/${path}`, component });

    const builRoute = (path, component) => <PrivateRoute key={path} {...prop(path, component) } /> ;

    const routes = [
        builRoute('', HomePage)
        ,builRoute('registros', Registers)
        ,builRoute('clientes', Clients)
        ,builRoute('sucursales', Areas)
        ,builRoute('usuarios', Users)
        ,builRoute('roles', Roles)
        ,builRoute('permisos', Resources)
        ,builRoute('recibos', Receipts)
        ,builRoute('instructores', Instructors)
        ,builRoute('app', App)
        
    ];

    return (
        <React.Fragment>          

            <ToastContainer autoClose={5000} hideProgressBar />

            <MobileMenu layout={headerLayout}/>

            <div className="site">
                <header className="site__header d-lg-none">
                    <MobileHeader />
                </header>
                <header className="site__header d-lg-block d-none">
                    <Header layout={headerLayout} />
                </header>

                <div className="site__body">
                
                    <Switch>
                        {routes}  
                    </Switch>
                </div>

                <footer className="site__footer">
                    <Footer showInfo={true} />
                </footer>
            </div>
        </React.Fragment>

    )
}

export default Layout;

