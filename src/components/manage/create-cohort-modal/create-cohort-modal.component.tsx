import * as React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  InputGroup, InputGroupText, InputGroupAddon, Input,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { ICreateCohortModal } from './create-cohort-modal.container';


const inputNames = {
  DESCRIPTION: 'NEW_COHORT_DESCRIPTION',
  NAME: 'NEW_COHORT_NAME',
}

export class CreateCohortModal extends React.Component<ICreateCohortModal, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateLocations();
    this.props.manageGetUsersByGroup('trainer');
  }

  updateNewCohortInfo = (e) => {
    let updatedNewCohort = this.props.createCohort.newCohort;
    switch (e.target.name) {
      case inputNames.DESCRIPTION:
        updatedNewCohort = {
          ...updatedNewCohort,
          cohortDescription: e.target.value
        }
        break;
      case inputNames.NAME:
        updatedNewCohort = {
          ...updatedNewCohort,
          cohortName: e.target.value
        }
        break;
      default:
        break;
    }
    this.props.updateNewCohort(updatedNewCohort)
    console.log(updatedNewCohort);
  }

  saveNewCohort = (e) => {
    e.preventDefault();
    console.log('saving')
    this.props.saveCohort(this.props.createCohort.newCohort);
  }



  render() {

    const { createCohort, addresses , manageUsers} = this.props;
    return (
      <Modal isOpen={createCohort.enabled}>
        <form onSubmit={this.saveNewCohort}>
          <ModalHeader className="rev-background-color">Create Cohort</ModalHeader>
          <ModalBody>
            <div className="responsive-modal-row">
              <InputGroup className="responsive-modal-row-item">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input name={inputNames.NAME}
                  onChange={this.updateNewCohortInfo}
                  value={createCohort.newCohort.cohortName}
                  valid={!!createCohort.newCohort.cohortName}
                  invalid={!createCohort.newCohort.cohortName} />
              </InputGroup>
              <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                isOpen={this.props.createCohort.locationDropdownActive}
                toggle={this.props.toggleLocationDropdown}>
                <DropdownToggle caret>
                  {createCohort.newCohort.address.alias || 'Location'}
                </DropdownToggle>
                <DropdownMenu>
                  {
                    addresses.trainingAddresses.length === 0
                      ? <>
                        <DropdownItem>Unable To Find Any Locations</DropdownItem>
                        <DropdownItem divider />
                      </>
                      : addresses.trainingAddresses.map(location =>
                        <DropdownItem key={location.addressId} onClick={() => this.props.updateNewCohortLocation(location)}>{location.alias}</DropdownItem>
                      )
                  }
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="responsive-modal-row">
              <textarea name={inputNames.DESCRIPTION}
                className="responsive-modal-row-item"
                placeholder="Description"
                onChange={this.updateNewCohortInfo}
                value={createCohort.newCohort.cohortDescription}
                required />
            </div>
            <div>
            <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                isOpen={this.props.createCohort.trainerDropdownActive}
                toggle={this.props.toggleTrainerDropdown}>
                <DropdownToggle caret>
                  {createCohort.newCohort.trainer.email || 'Trainer'}
                </DropdownToggle>
                <DropdownMenu>
                  {
                    manageUsers.manageUsers.length === 0
                      ? <>
                        <DropdownItem>No trainers available</DropdownItem>
                        <DropdownItem divider />
                      </>
                      : manageUsers.manageUsers.map(trainer =>
                        <DropdownItem key={trainer.email} onClick={() => this.props.updateNewCohortTrainer(trainer)}>{trainer.email}</DropdownItem>
                      )
                  }
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              {createCohort.newCohort.cohortToken || 'this is where the token should go'}
            </div>
          </ModalBody>
          <ModalFooter id="create-Cohort-modal-footer">
            <Button type="submit" className="rev-btn">Save</Button>{' '}
            <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    );
  }
}

