import * as React from 'react';
import {Modal, ModalBody, ModalFooter, Button} from 'reactstrap';
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
}
export class AssociateRowCheckinComponent extends React.Component<IProps, {}> {


  public render() {
    return (
      <>
        <div>
        <Modal on isOpen={this.props.modal} className="manager-comments">
          <ModalBody>
            <ManagerCheckinTableComponent/>
          </ModalBody>
          <ModalFooter>
              {/* Dates  */}
            <Button color="primary" onClick={managerActions.getCheckInByUserId(
                  this.props.userId, 0, new Date().getTime())}
            >Get Checkins</Button> 
            <Button color="secondary" onClick={this.props.modalOff}>Close</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(AssociateRowCheckinComponent)