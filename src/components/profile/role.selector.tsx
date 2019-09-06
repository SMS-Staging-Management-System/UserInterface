import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, FormGroup, Input, Row } from 'reactstrap';
import { cognitoRoles } from '../../model/cognito-user.model';
import { IUser } from '../../model/user.model';
import { IState } from '../../reducers';
import { inputNames } from './profile.component';

export interface IRoleSelectorProps {
    updateUser: IUser
    currentSMSUser: IUser
    onChangeHandler: (event: any) => any
}

interface IRoleSelectorState {

}

export class RoleSelector extends Component<IRoleSelectorProps, IRoleSelectorState> {
    constructor(props: IRoleSelectorProps) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.currentSMSUser.roles.length === 0
                    ? <Input
                        type="text"
                        name={inputNames.ROLES}
                        value="Associate" 
                        disabled />
                    : <FormGroup className="m-0" check inline>
                        <Row>
                            <Col>
                                <Input
                                    className="m-0"
                                    type="checkbox"
                                    value={cognitoRoles.ADMIN}
                                    checked={this.props.updateUser.roles.includes(cognitoRoles.ADMIN)}
                                    name={inputNames.ROLES}
                                    onChange={this.props.onChangeHandler} />
                                <br />
                                Admin
                            </Col>
                            <Col>
                                <Input
                                    className="m-0"
                                    type="checkbox"
                                    value={cognitoRoles.STAGING_MANAGER}
                                    checked={this.props.updateUser.roles.includes(cognitoRoles.STAGING_MANAGER)}
                                    name={inputNames.ROLES}
                                    onChange={this.props.onChangeHandler} />
                                <br />
                                Staging Manager
                            </Col>
                            <Col>
                                <Input
                                    className="m-0"
                                    type="checkbox"
                                    value={cognitoRoles.TRAINER}
                                    checked={this.props.updateUser.roles.includes(cognitoRoles.TRAINER)}
                                    name={inputNames.ROLES}
                                    onChange={this.props.onChangeHandler} />
                                <br />
                                Trainer
                            </Col>
                            <Col>
                                <Input
                                    className="m-0"
                                    type="checkbox"
                                    value="associate"
                                    checked={!(this.props.updateUser.roles.includes(cognitoRoles.ADMIN)
                                        || this.props.updateUser.roles.includes(cognitoRoles.STAGING_MANAGER)
                                        || this.props.updateUser.roles.includes(cognitoRoles.TRAINER))}
                                    name={inputNames.ROLES}
                                    onChange={this.props.onChangeHandler} />
                                <br />
                                Associate
                            </Col>
                        </Row>
                    </FormGroup>}
            </>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RoleSelector)
