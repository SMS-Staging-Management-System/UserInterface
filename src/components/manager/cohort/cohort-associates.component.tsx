import * as React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { AssociateTableComponent } from "src/components/table/associateTable.component";

/*
 *The cohort associates component
 */

interface IState {
  toggle: () => void;
  collapse: boolean;
}
export class CohortAssociatesComponent extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      toggle: this.toggle
    };
  }

  public toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  public render() {
    return (
      <>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          Toggle
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              Heading

              <AssociateTableComponent />
              
            </CardBody>
          </Card>
        </Collapse>
      </>
    );
  }
}

export default CohortAssociatesComponent;
