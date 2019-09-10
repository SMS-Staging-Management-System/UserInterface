import React from 'react'
import { Route, Switch } from 'react-router';
import ManageComponent from '../components/manage/manage.container';
import ProtectedRoute from '../components/protected-route.component/protected-route.component';
import LoginComponent from '../components/login/login.container';
import { HomeComponent } from '../components/home/home.component';
import JoinCohortComponent from '../components/join-cohort/join-cohort.component';
import resetPasswordContainer from '../components/resetPassword/reset-password.container';
import resetPasswordUsernameContainer from '../components/resetPasswordUsername/reset-password-username.container'
import { cognitoRoles } from '../model/cognito-user.model';
import Profile from '../components/profile/profile.component';

export class ManagementRoutes extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        const { path } = this.props.match
        return (
            <Switch>
                <Route path={`${path}/profile`} component={Profile} />
                <Route path={`${path}/login`} component={LoginComponent} />
                <Route path={`${path}/home`} component={HomeComponent} />
                <Route path={`${path}/reset-password`} component={resetPasswordContainer} />
                <Route path={`${path}/send-email`} component={resetPasswordUsernameContainer} />
                <Route path={`${path}/joincohort/:token`} component={JoinCohortComponent} />
                <ProtectedRoute allowedRoles={[cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]} path={`${path}/manage/:manage`} component={ManageComponent} />
                <Route component={HomeComponent} />
            </Switch>

        )

    }
}
