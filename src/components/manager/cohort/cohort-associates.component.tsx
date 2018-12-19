import * as React from "react";
import { Collapse, Button } from "reactstrap";
import AssociateTableComponent from "src/components/table/associateTable.component";
import CreateNewAddAssociateModalComponent from "./associate-add-modal.component";

/*
 *The cohort associates component
 */

export interface IState {
  modal: boolean;
}

interface IProps {
  collapse: boolean;
  selected: number;
}

export class CohortAssociatesComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  public modalOn = () => {
    this.setState({
      ...this.state,
      modal: true
    });
  };

  public modalOff = () => {
    this.setState({
      ...this.state,
      modal: false
    });
  };

  public render() {
    return (
      <>
        <Button className="mb-2 button-add" onClick={this.modalOn} >Add Associate</Button>

        <Collapse isOpen={this.props.collapse}>
          {/* <Card>
            <CardBody> */}

          <AssociateTableComponent />

          {/* </CardBody>
          </Card> */}
        </Collapse>

        <CreateNewAddAssociateModalComponent
              toggle={this.modalOn}
              modal={this.state.modal}
              modalOff={this.modalOff}
              selected={this.props.selected}
            />
      </>
    );
  }
}

export default CohortAssociatesComponent;
