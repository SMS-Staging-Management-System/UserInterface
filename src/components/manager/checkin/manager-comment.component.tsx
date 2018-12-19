import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import { IState } from '../../../reducers/index';
import { connect } from 'react-redux';
import * as managerActions from '../../../actions/manager/manager.actions';

/*
 *The manager's comment component
 */
interface IProps {
  checkinId: number
  firstName: string
  modal: boolean
  toggle: (name: string) => void
  modalOff: () => void
  managerPostComment: (comment: string, checkinId: number) => void
}

interface IComponentState {
  comment: string
}

export class ManagerCommentComponent extends React.Component<IProps, IComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }

  public getComment = (event) => {
    this.setState({
      comment: event.target.value
    })
  }

  public handlePostComment = () => {
    this.props.managerPostComment(this.state.comment, this.props.checkinId);
    this.props.modalOff();
  }

  public render() {
    return (
      <>
        <div>
          <Modal on isOpen={this.props.modal} className="manager-comments">
            <ModalHeader>Leave a comment for {this.props.firstName}</ModalHeader>
            <ModalBody>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="comment-addon">
                    Comment:
              </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="note to associate" onChange={this.getComment} />
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button className="rev-btn" onClick={this.handlePostComment}>Submit</Button>
              <Button color="secondary" onClick={this.props.modalOff}>Cancel</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(ManagerCommentComponent)