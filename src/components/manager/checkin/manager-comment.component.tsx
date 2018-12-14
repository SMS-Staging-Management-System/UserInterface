import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
/*
  *The manager's comment component
*/
interface IProps {
  firstName: string
  modal: boolean
  toggle: (name:string) => void
  modalOff: () => void
}
export class ManagerCommentComponent extends React.Component<IProps, {}> {
  
  public render() {
    return (
      <>
        <div>
        <Modal on isOpen={this.props.modal} className="manager-comments">
          <ModalHeader>Leave a comment for {this.props.firstName}</ModalHeader>
          <ModalBody>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><InputGroupText className="comment-addon">Comment:</InputGroupText></InputGroupAddon>
            <Input placeholder="note to associate" />
          </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="rev-btn" onClick={this.props.modalOff}>Submit</Button>
            <Button color="secondary" onClick={this.props.modalOff}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div> 
      </>

    );
  }
}

export default ManagerCommentComponent