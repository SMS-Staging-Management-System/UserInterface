import React, { Component } from 'react';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { connect } from 'react-redux';
import Button from 'reactstrap/lib/Button';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import { UncontrolledDropdown } from 'reactstrap/lib/Uncontrolled';
import { IStatus } from '../../model/status.model';
import { IUser } from '../../model/user.model';
import { IState } from '../../reducers';
import { inputNames } from './profile.component';

interface ISCStatusDropdownProps {
    currentSMSUser: IUser
    userStatuses: IStatus[]
    updateUser: IUser
    changeHandler: (event: any) => any
}

interface ISCStatusDropdownState {
    buttonText: string
}

export class SCStatusDropdown extends Component<ISCStatusDropdownProps, ISCStatusDropdownState> {
    constructor(props: ISCStatusDropdownProps) {
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

    componentDidUpdate(prevProps: ISCStatusDropdownProps) {
        if (prevProps != this.props) {
            this.setState({
                buttonText: this.props.updateUser.userStatus && this.props.updateUser.userStatus.generalStatus && this.props.updateUser.userStatus.specificStatus || 'No Status'
            })
        }
    }

    render() {
        let dropDownHeaders: string[] = [];
        let dropDownArr: any[] = [];

        for (let i = 0; i < this.props.userStatuses.length; i++) {
            const status = this.props.userStatuses[i];
            if (!dropDownHeaders.includes(status.generalStatus)) {
                dropDownArr.push(<DropdownItem className="dropdown-header" disabled>{status.generalStatus}</DropdownItem>);
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
                    <Button name={inputNames.STATUS_ALIASES} className="user-btn" disabled>{this.state.buttonText}</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SCStatusDropdown)
