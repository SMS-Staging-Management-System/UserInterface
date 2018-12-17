import * as React from 'react';
import { ManagerCheckinTableComponent } from '../table/manager-checkin-table.component';
import CohortTableComponent from '../table/cohortTable.component';
import CohortAssociatesComponent from './cohort/cohort-associates.component';
import ManagerCheckinFilterComponent from '../table/manager-checkin-filter.component';
import { CreateNewModalComponent } from './cohort/cohort-create-modal.component';
import { Button } from "reactstrap";


export interface IState {
  modal: boolean
}

/**
 * The container for the check-in and cohort tables
 */
export class ContainerComponent extends React.Component<{}, IState> {
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
    })
  }

  public modalOff = () => {
    this.setState({
      ...this.state,
      modal: false
    })
  }

  public render() {
    return (
      <>
        <nav>
          <div className="nav nav-tabs manager-container" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active nav-t" id="nav-contact-tab" data-toggle="tab" href="#check-in" role="tab" aria-controls="check-in" aria-selected="true" aria-hidden="false">Check-In</a>
            <a className="nav-item nav-link nav-t" id="nav-profile-tab" data-toggle="tab" href="#cohort" role="tab" aria-controls="nav-profile" aria-selected="false">Cohort</a>
          </div>
        </nav>
        {/* tab contents */}
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade active show" id="check-in" role="tabpanel" >
            <div className="div-filter">
              <ManagerCheckinFilterComponent />

                {/* <div className="col">
                  <ManagerCheckinFilterComponent />
                </div>
                <div className="col">
                  <form>
                    <input id="man-search" type="text" name="firstname" placeholder="Search" />
                    {/* <input type="submit" value="Submit" /> *
                  </form>
                </div>
                <div className="col">
                  Today |  Week  |  <Input type="date" name="date" className="start-date" placeholder="date placeholder" />  to <Input type="date" name="date" className="end-date" placeholder="date placeholder" />
                </div> */}

              <ManagerCheckinTableComponent />
            </div>
          </div>
          <div className="tab-pane fade container-fluid" id="cohort" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div className="row mt-2">
              <div className="col-3 pl-0">
                <div className="mb-2">
                  <Button
                    color="primary"
                    className="btn btn-danger"
                    onClick={this.modalOn}
                  >New Cohort
                </Button>
                  <div>
                  </div>
                  <CohortTableComponent />
                </div>
                <div className="col-9 pr-0">
                  <CohortAssociatesComponent />
                </div>
              </div>
            </div>
            <CreateNewModalComponent
              toggle={this.modalOn}
              modal={this.state.modal}
              modalOff={this.modalOff} />
          </div>
        </div>
      </>
    );
  }
}

export default ContainerComponent
