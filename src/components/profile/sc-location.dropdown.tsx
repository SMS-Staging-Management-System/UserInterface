import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { IAddress } from '../../model/address.model';
import { IUser } from '../../model/user.model';
import { IState } from '../../reducers';
import { inputNames } from './profile.component';

export interface ISCLocationDropdownState {
    buttonText: string
}

export interface ISCLocationDropdownProps {
    currentSMSUser: IUser
    updateUser: IUser
    trainingAddresses: IAddress[]
    changeHandler: (event: any) => any
}

export class SCLocationDropdown extends Component<ISCLocationDropdownProps, ISCLocationDropdownState> {
    constructor(props: ISCLocationDropdownProps) {
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

    componentDidUpdate(prevProps: ISCLocationDropdownProps) {
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
                    <Button
                        name={inputNames.TRAINING_ALIASES}
                        className='ml-2'
                        disabled >{this.state.buttonText}</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SCLocationDropdown)
