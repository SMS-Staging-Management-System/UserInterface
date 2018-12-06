import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

/*
  *The manager's comment component
*/

interface IProps {
  modal: boolean
  toggle: () => void
}

export class CommentComponent extends React.Component<IProps, {}> {
  public render() {
    return (
      <>
        <div>
        <Modal isOpen={this.props.modal} className="Button">
          <ModalHeader>Leave a comment</ModalHeader>
          <ModalBody>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Comment: </InputGroupAddon>
            <Input placeholder="note to associate" />
          </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div> 
      </>

    );
  }
}

export default CommentComponent