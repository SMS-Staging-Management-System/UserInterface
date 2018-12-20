import * as React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
// import { ICheckIn } from '../../../model/CheckIn.model';
import { IState } from '../../../reducers/index';
import { connect } from 'react-redux';
import * as managerActions from '../../../actions/manager/manager.actions';
import ManagerCheckinTableComponent from 'src/components/table/manager-checkin-table.component';


/*
  *The manager's comment component
*/
interface IProps {
  modal: boolean
  modalOff: () => void
  userId: number
  getCheckInByUserId: (userId: number, fromDate: number, toDate: number) => void
}
export class AssociateRowCheckinComponent extends React.Component<IProps, {}> {

  public componentWillReceiveProps (newProps) {
    if( newProps.userId !== this.props.userId ) {
      this.props.getCheckInByUserId(this.props.userId, 0, new Date().getTime())
    }
  }

  public render() {
    return (
      <Modal on isOpen={this.props.modal} className="manager-comments">
        <ModalBody>
          <ManagerCheckinTableComponent />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.modalOff}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = (state: IState) => (state.manager)
const mapDispatchToProps = {
  ...managerActions
}
export default connect(mapStateToProps, mapDispatchToProps)(AssociateRowCheckinComponent)