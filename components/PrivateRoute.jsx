import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { storageService } from '../services/storage.service';
// Containers
const AdminLayout = React.lazy(() => import('../containers/AdminLayout'));

export const PrivateRoute = ({ component: Component, ...rest }) => (
    
    <Route {...rest} render={props => (
        storageService.isLoggedIn()
            ? <AdminLayout {...props}/>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)