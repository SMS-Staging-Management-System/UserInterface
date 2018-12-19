import * as React from 'react';
import { IState } from '../../../reducers/index';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormGroup, Input, Label } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import * as managerActions from '../../../actions/manager/manager.actions';
import { ICohort } from 'src/model/Cohort.model';

/*
* The modal to add an associate to a cohort
*/

export interface IProps {
  modal: boolean
  toggle: (name: string) => void
  modalOff: () => void
  selected: number
  cohorts: ICohort[]
}

interface IComponentState {
    associateEmail: any
    cohort: string
  }

export class CreateNewAddAssociateModalComponent extends React.Component<IProps, IComponentState> {

  constructor(props) {
    super(props);
    this.state = {
        associateEmail: '',
        cohort: ''
      }
  }

  public handleAssociateEmail = (e: any) => {
    this.setState({
        ...this.state,
      associateEmail: e.target.value
    });
  }

  public show = () => {
    if (this.props.cohorts.length === 0) {
        return null
    } else {
        const cohort: ICohort = this.props.cohorts.find((element) => (element.cohortId === this.props.selected))
        return cohort.cohortName;
    }
  }

  public render() {
    return (
      <>
        <div>
        <Modal isOpen={this.props.modal} className="manager-comments">
            <ModalHeader>Add Associate to Cohort {this.show()} </ModalHeader>
            <ModalBody className="">

            <Row form>
                <Col xs={12}>
                  <FormGroup>
                    <Label for="cohort-name">Associate Email</Label>
                    <Input type="email" name="associate-email" id="associate-email" placeholder="Email"
                      value={this.state.associateEmail}
                      onChange={this.handleAssociateEmail.bind(this)} />
                  </FormGroup>
                </Col>

              </Row>

              </ModalBody>
              <ModalFooter className="flex-btw">
              <Button className="rev-btn " >Submit</Button>
              <Button className="" color="secondary" onClick={this.props.modalOff}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.manager)
const mapDispatchToProps = {
  ...managerActions
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewAddAssociateModalComponent);