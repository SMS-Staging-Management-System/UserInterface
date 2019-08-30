import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../reducers';
import { IUser } from '../../model/user.model';
import { UncontrolledDropdown } from 'reactstrap/lib/Uncontrolled';
import { inputNames } from './profile.component';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { IAddressState } from '../../reducers/management';
import { Button } from 'react-bootstrap';

interface ISCProfileTrainingLocationButtonState {
    buttonText: string
}

interface ISCProfileTrainingLocationButtonProps {
    currentSMSUser: IUser
    updateUser: IUser
    trainingAddresses: IAddressState
    changeHandler: (event: any) => any
}

export class SCProfileTrainingLocationButton extends Component<ISCProfileTrainingLocationButtonProps, ISCProfileTrainingLocationButtonState> {
    constructor(props: ISCProfileTrainingLocationButtonProps) {
        super(props);

        this.state = {
            buttonText: this.props.updateUser.trainingAddress && this.props.updateUser.trainingAddress.alias || 'Loading'
        }
    }

    selectHandler = (event: any) => {
        this.setState({
            buttonText: event.currentTarget.innerText
        })
        this.props.changeHandler({target: {name: inputNames.TRAINING_ALIASES, value: event.currentTarget.innerText}});
    }

    componentDidUpdate(prevProps: ISCProfileTrainingLocationButtonProps) {
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
                                : this.props.trainingAddresses.trainingAddresses.map(location =>
                                    <DropdownItem
                                        key={location.addressId}
                                        onClick={this.selectHandler} >
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
    trainingAddresses: state.managementState.addresses
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SCProfileTrainingLocationButton)
