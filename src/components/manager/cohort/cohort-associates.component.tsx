import * as React from "react";
import { Collapse, Button } from "reactstrap";
import AssociateTableComponent from "src/components/table/associateTable.component";

/*
 *The cohort associates component
 */

interface IProps {
  collapse: boolean;
}

export class CohortAssociatesComponent extends React.Component<IProps> {
  constructor(props) {
    super(props);

  }

  public render() {
    return (
      <>
        <Button className="my-2">Add Associate</Button>

        <Collapse isOpen={this.props.collapse}>
          {/* <Card>
            <CardBody> */}

          <AssociateTableComponent />

          {/* </CardBody>
          </Card> */}
        </Collapse>
      </>
    );
  }
}

export default CohortAssociatesComponent;
