import * as React from 'react';
import TableComponent from '../table/table.component';
import CohortAssociatesComponent from './cohort/cohort-associates.component';

/*
  *The container for the check-in and cohort tables
*/


export class ContainerComponent extends React.Component <{},{}> {

  public render() {
    return (
        <>
        <nav>
          <div className="nav nav-tabs manager-container" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-contact-tab" data-toggle="tab" href="#check-in" role="tab" aria-controls="check-in" aria-selected="true" aria-hidden="false">Check-In</a>
            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#cohort" role="tab" aria-controls="nav-profile" aria-selected="false">Cohort</a>
          </div>
        </nav>
         {/* tab contents */}
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade active show" id="check-in" role="tabpanel" >
            <div >
              {/* check-in table component */}
              <TableComponent type="checkIn" />
            </div>
          </div>
          <div className="tab-pane fade d-flex" id="cohort" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div className="flex-grow-1">
              {/* cohort table component*/}
              <TableComponent type="cohort"/>
            </div>
            <div className="flex-grow-1">
              <CohortAssociatesComponent />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ContainerComponent