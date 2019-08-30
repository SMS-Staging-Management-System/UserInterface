import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../reducers';
import { IUser } from '../../model/user.model';
import { IStatus } from '../../model/status.model';
import Button from 'reactstrap/lib/Button';
import { inputNames } from './profile.component';
import { UncontrolledDropdown } from 'reactstrap/lib/Uncontrolled';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';

interface ISCProfileStatusDropdownProps {
    currentSMSUser: IUser
    userStatuses: IStatus[]
    updateUser: IUser
    changeHandler: (event: any) => any
}

interface ISCProfileStatusDropdownState {
    buttonText: string
}

export class SCProfileStatusDropdown extends Component<ISCProfileStatusDropdownProps, ISCProfileStatusDropdownState> {
    constructor(props: ISCProfileStatusDropdownProps) {
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

    componentDidUpdate(prevProps: ISCProfileStatusDropdownProps) {
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

export default connect(mapStateToProps, mapDispatchToProps)(SCProfileStatusDropdown)
