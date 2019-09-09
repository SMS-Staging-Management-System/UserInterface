import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IStatus } from '../../model/status.model';
import { IUser } from '../../model/user.model';
import { IState } from '../../reducers';
import { inputNames } from './profile.component';
import { DropdownItem, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

export interface IStatusDropdownProps {
    currentSMSUser: IUser
    userStatuses: IStatus[]
    updateUser: IUser
    changeHandler: (event: any) => any
}

interface IStatusDropdownState {
    buttonText: string
}

export class StatusDropdown extends Component<IStatusDropdownProps, IStatusDropdownState> {
    constructor(props: IStatusDropdownProps) {
        super(props);

        this.state = {
            buttonText: this.props.updateUser.userStatus && this.props.updateUser.userStatus.generalStatus && this.props.updateUser.userStatus.specificStatus || 'Loading'
        }
    }

    selectHandler = (event: any) => {
        this.setState({
            buttonText: event.currentTarget.innerText
        })
        this.props.changeHandler({ target: { name: inputNames.STATUS_ALIASES, value: event.currentTarget.innerText } });
    }

    componentDidUpdate(prevProps: IStatusDropdownProps) {
        if (prevProps !== this.props) {
            this.setState({
                buttonText: this.props.updateUser.userStatus && this.props.updateUser.userStatus.generalStatus && this.props.updateUser.userStatus.specificStatus || 'No Status'
            })
        }
    }

    render() {
        const dropDownHeaders: string[] = [];
        const dropDownArr: any[] = [];

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.props.userStatuses.length; i++) {
            const status = this.props.userStatuses[i];
            if (!dropDownHeaders.includes(status.generalStatus)) {
                dropDownArr.push(<DropdownItem header>{status.generalStatus}</DropdownItem>);
                dropDownArr.push(<DropdownItem divider></DropdownItem>)
                dropDownHeaders.push(status.generalStatus);
            }
            if (!status.virtual) {
                dropDownArr.push(<DropdownItem
                    key={status.statusId} 
                    onClick={this.selectHandler}
                    active={status.specificStatus === this.state.buttonText}>
                    {status.specificStatus}
                </DropdownItem>)
            }
        }

        return (
            <>
                {this.props.currentSMSUser.roles.length === 0 ?
                    <Button name={inputNames.STATUS_ALIASES} className="ml-2" disabled>{this.state.buttonText}</Button>
                    :
                    <UncontrolledDropdown name={inputNames.STATUS_ALIASES} caret>
                        <DropdownToggle>
                            {this.state.buttonText}
                        </DropdownToggle>
                        <DropdownMenu>
                            {!this.props.userStatuses
                                ? <>
                                    <DropdownItem>Unable To Find Any Statuses</DropdownItem>
                                </>
                                : dropDownArr
                            }
                        </DropdownMenu>
                    </UncontrolledDropdown>
                }
            </>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    userStatuses: state.managementState.statuses.userStatus
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(StatusDropdown)
