import React from 'react'
import { Route, Switch } from 'react-router';
<<<<<<< HEAD
import ManageComponent from '../components/manage/manage.container';
import ProtectedRoute from '../components/protected-route.component/protected-route.component';
import LoginComponent from '../components/login/login.container';
import { HomeComponent } from '../components/home/home.component';
import JoinCohortComponent from '../components/join-cohort/join-cohort.container';
import profileContainer from '../components/profile/profile.container';
import resetPasswordContainer from '../components/resetPassword/reset-password.container';
import resetPasswordUsernameContainer from '../components/resetPasswordUsername/reset-password-username.container'
import { cognitoRoles } from '../model/cognito-user.model';

export class ManagementRoutes extends React.Component<any, any> {
    constructor(props: any) {
=======
import clickerContainer from '../components/clicker/clicker.container';
import ManageComponent from '../components/manage/manage.container';
import  ProtectedRoute  from '../components/protected-route.component/protected-route.component';
import  LoginComponent  from '../components/login/login.container';
import { HomeComponent } from '../components/home/home.component';
import  JoinCohortComponent from '../components/join-cohort/join-cohort.container';
import profileContainer from '../components/profile/profile.container';
import resetPasswordContainer from '../components/resetPassword/reset-password.container';
import resetPasswordUsernameContainer from '../components/resetPasswordUsername/reset-password-username.container'

export class ManagementRoutes extends React.Component<any, any> {
    constructor(props:any){
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        super(props)
    }

    render() {
<<<<<<< HEAD
        let { path } = this.props.match
=======
        let {path} =this.props.match
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        return (
            <Switch>
                <Route path={`${path}/profile`} component={profileContainer} />
                <Route path={`${path}/login`} component={LoginComponent} />
                <Route path={`${path}/home`} component={HomeComponent} />
<<<<<<< HEAD
                <Route path={`${path}/reset-password`} component={resetPasswordContainer} />
                <Route path={`${path}/send-email`} component={resetPasswordUsernameContainer} />
                <Route path={`${path}/joincohort/:token`} component={JoinCohortComponent} />
                <ProtectedRoute allowedRoles={[cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]} path={`${path}/manage/:manage`} component={ManageComponent} />
=======
                <Route path={`${path}/clicker`} component={clickerContainer} />
                <Route path={`${path}/reset-password`} component={resetPasswordContainer}/>
                <Route path={`${path}/send-email`} component={resetPasswordUsernameContainer}/>
                <Route path={`${path}/joincohort/:token`} component={JoinCohortComponent}/>
                <ProtectedRoute allowedRoles={['admin', 'staging-manager', 'trainer']} path={`${path}/manage/:manage`} component={ManageComponent} />
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
                <Route component={HomeComponent} />
            </Switch>

        )

    }
<<<<<<< HEAD
}
=======
}
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
