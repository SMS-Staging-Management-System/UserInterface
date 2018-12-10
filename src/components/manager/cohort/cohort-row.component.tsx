import * as React from "react";

/**
 * The class row
 */

// this fake data for the cohort table
const FAKE_COHORT_DATA = [
  {
    cohort: "Blake 1810",
    description: "I am working on my portfolio today",
    firstName: "Nigel",
    lastName: "Christian",
    time: "12/4/2018 @ 0900",
    userId: 1
  },
  {
    cohort: "Blake 1810",
    description: "I am taking the OCA today",
    firstName: "Andrew",
    lastName: "Wilson",
    time: "12/4/2018 @ 0900",
    userId: 2
  },
  {
    cohort: "Blake 1810",
    description:
      "I am working on an internal Revature project for staging today",
    firstName: "Calvin",
    lastName: "Vo",
    time: "12/4/2018 @ 0900",
    userId: 3
  }
];

export class CohortRowComponent extends React.Component<{}> {

  public handleClick = () => {
    // const cohort = document.getElementById("cohort-associates") as HTMLElement;

    // cohort.style.width = "400px";
  }

  public render() {
    return (
      <>
        {FAKE_COHORT_DATA.map(user => {
          return (
          <tr id={`row-${user.userId}`} key={user.userId} onClick={() => this.handleClick()}>
            <td>1810 </td>
            <td>4</td>
          </tr>
        )})}
      </>
    );
  }
}

export default CohortRowComponent;
