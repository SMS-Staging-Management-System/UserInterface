import * as React from 'react';
// import CohortAssociatesComponent from './cohort/cohort-associates.component';
import CheckinTableComponent from '../table/checkinTable.component';
import CohortTableComponent from '../table/cohortTable.component';
import CohortAssociatesComponent from './cohort/cohort-associates.component';

/*
  *The container for the check-in and cohort tables
  currently attempting to paginate check-in data,
  add a date range picker, and filter by late check-in, cohort, default (most recent), etc.
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
              <CheckinTableComponent type="manager"/>
            </div>
          </div>
          <div className="tab-pane fade container-fluid" id="cohort" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div className="row">
              <div className="col-6">
                <CohortTableComponent />
              </div>
              <div className="col-6">
                <CohortAssociatesComponent />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ContainerComponent