import * as React from "react";

/*
 *The cohort header component
 */

export class CohortTableHeaderComponent extends React.Component<{}> {
  public render() {
    return (
      <>
        <thead>
          <tr>
            <th scope="col">Cohort</th>
          </tr>
        </thead>
      </>
    );
  }
}

export default CohortTableHeaderComponent;
