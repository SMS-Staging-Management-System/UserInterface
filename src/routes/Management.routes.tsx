import React from 'react'
import { Route, Switch } from 'react-router';
import clickerContainer from '../components/clicker/clicker.container';
import ManageComponent from '../components/manage/manage.container';
import  ProtectedRoute  from '../components/protected-route.component/protected-route.component';
import  LoginComponent  from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';



export class ManagementRoutes extends React.Component<any, any> {
    constructor(props){
        super(props)
    }

    render() {
        let {path} =this.props.match
        return (
            <Switch>
                <Route path={`${path}/login`} component={LoginComponent} />
                <Route path={`${path}/home`} component={HomeComponent} />
                <Route path={`${path}/clicker`} component={clickerContainer} />
                <ProtectedRoute allowedRoles={['admin', 'staging-manager', 'trainer']} path={`${path}/manage/:manage`} component={ManageComponent} />
                <Route component={HomeComponent} />
            </Switch>


        )


    }
}