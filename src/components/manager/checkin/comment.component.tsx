import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
/*
  *The manager's comment component
*/
interface IProps {
  firstName: string
  modal: boolean
  toggle: (name:string) => void
  modalOff: () => void
}
export class CommentComponent extends React.Component<IProps, {}> {
  public render() {
    return (
      <>
        <div>
        <Modal isOpen={this.props.modal} className="Button">
          <ModalHeader>Leave a comment for {this.props.firstName}</ModalHeader>
          <ModalBody>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Comment: </InputGroupAddon>
            <Input placeholder="note to associate" />
          </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.modalOff}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.props.modalOff}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div> 
      </>

    );
  }
}

export default CommentComponent