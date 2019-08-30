import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { connect } from 'react-redux';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import { UncontrolledDropdown } from 'reactstrap/lib/Uncontrolled';
import { IAddress } from '../../model/address.model';
import { IUser } from '../../model/user.model';
import { IState } from '../../reducers';
import { inputNames } from './profile.component';

interface ISCProfileTrainingLocationDropdownState {
    buttonText: string
}

interface ISCProfileTrainingLocationDropdownProps {
    currentSMSUser: IUser
    updateUser: IUser
    trainingAddresses: IAddress[]
    changeHandler: (event: any) => any
}

export class SCProfileTrainingLocationDropdown extends Component<ISCProfileTrainingLocationDropdownProps, ISCProfileTrainingLocationDropdownState> {
    constructor(props: ISCProfileTrainingLocationDropdownProps) {
        super(props);

        this.state = {
            buttonText: this.props.updateUser.trainingAddress && this.props.updateUser.trainingAddress.alias || 'Loading'
        }
    }

    selectHandler = (event: any) => {
        this.setState({
            buttonText: event.currentTarget.innerText
        })
        this.props.changeHandler({ target: { name: inputNames.TRAINING_ALIASES, value: event.currentTarget.innerText } });
    }

    componentDidUpdate(prevProps: ISCProfileTrainingLocationDropdownProps) {
        if (prevProps !== this.props) {
            this.setState({
                buttonText: this.props.updateUser.trainingAddress && this.props.updateUser.trainingAddress.alias || 'No Location'
            })
        }
    }

    render() {
        return (
            <>
                {this.props.currentSMSUser.roles.length === 0 ?
                    <Button name={inputNames.TRAINING_ALIASES} disabled>{this.state.buttonText}</Button>
                    :
                    <UncontrolledDropdown name={inputNames.TRAINING_ALIASES} caret>
                        <DropdownToggle>
                            {this.state.buttonText}
                        </DropdownToggle>
                        <DropdownMenu>
                            {!this.props.trainingAddresses
                                ? <>
                                    <DropdownItem>Unable To Find Any Locations</DropdownItem>
                                </>
                                : this.props.trainingAddresses.map(location =>
                                    <DropdownItem
                                        key={location.addressId}
                                        onClick={this.selectHandler}
                                        active={location.alias === this.state.buttonText}>
                                        {location.alias}
                                    </DropdownItem>
                                )}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                }
            </>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    trainingAddresses: state.managementState.addresses.trainingAddresses
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SCProfileTrainingLocationDropdown)
