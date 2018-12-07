import * as React from "react";

/*
 *The cohort header component
 */

export class CohortHeaderComponent extends React.Component<{}> {
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

export default CohortHeaderComponent;
