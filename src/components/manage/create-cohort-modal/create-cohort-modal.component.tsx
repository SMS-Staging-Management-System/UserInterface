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
  }

  saveNewCohort = (e) => {
    e.preventDefault();
    console.log('saving')
    this.props.saveCohort(this.props.createCohort.newCohort);
  }



  render() {

    const { createCohort, addresses } = this.props;
    return (
      <Modal isOpen={this.props.createCohort.enabled}>
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

