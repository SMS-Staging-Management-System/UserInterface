import * as React from "react";
import { ManagerCheckinTableComponent } from "../table/manager-checkin-table.component";
import CohortTableComponent from "../table/cohortTable.component";
import CohortAssociatesComponent from "./cohort/cohort-associates.component";
import ManagerCheckinFilterComponent from "../table/manager-checkin-filter.component";
import CreateNewModalComponent from "./cohort/cohort-create-modal.component";
import { Button } from "reactstrap";
import ManagerUsersTableComponent from './manager-users-table.component'

import { History } from "history";
import { withRouter, Route } from "react-router-dom";

export interface IState {
  modal: boolean;
  collapse: boolean;
}

export interface IProps {
  history: History;
}

/**
 * The container for the check-in and cohort tables
 */
export class ContainerComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      modal: false
    };
  }

  public toggle = () => {
    this.setState({
      ...this.state,
      collapse: !this.state.collapse
    });
  };

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
        <nav>
          <div
            className="nav nav-tabs manager-container"
            id="nav-tab"
            role="tablist"
          >
            <a onClick={() => this.props.history.push("/dashboard/check-ins")} className="nav-item nav-link active nav-t" id="nav-contact-tab" data-toggle="tab" href="#check-in" role="tab" aria-controls="check-in" aria-selected="true" aria-hidden="false">
            Check-In
            </a>
            <a onClick={() => this.props.history.push("/dashboard/cohorts")} className="nav-item nav-link nav-t" id="nav-profile-tab" data-toggle="tab" href="#cohort" role="tab" aria-controls="nav-profile" aria-selected="false">
            Cohort
            </a>
            <a className="nav-item nav-link nav-t" id="nav-manage-users-tab" data-toggle="tab" href="#manage-users" role="tab" aria-controls="nav-manage-users" aria-selected="false">Users</a>
            {/* <Link
              to="/dashboard/check-ins"
              className="nav-item nav-link active nav-t"
              id="nav-contact-tab"
              data-toggle="tab"
              href="#check-in"
              role="tab"
              aria-controls="check-in"
              aria-selected="true"
              aria-hidden="false"
            >
              Check-In
            </Link>
            <Link
              to="/dashboard/cohorts"
              className="nav-item nav-link nav-t"
              id="nav-profile-tab"
              data-toggle="tab"
              href="#cohort"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Cohort
            </Link> */}
          </div>
        </nav>
        {/* tab contents */}
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade active show"
            id="check-in"
            role="tabpanel"
          >
            <div className="div-filter">
              <Route
                path="/dashboard/check-ins"
                component={ManagerCheckinFilterComponent}
              />
              {/* <ManagerCheckinFilterComponent/> */}

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

              <Route
                path="/dashboard/check-ins"
                component={ManagerCheckinTableComponent}
              />

              {/* <ManagerCheckinTableComponent /> */}
            </div>
          </div>
          <div
            className="tab-pane fade container-fluid"
            id="cohort"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div className="row mt-2">
              <div className="col-3 pl-0">
                <div className="mb-2">
                  <Button
                    color="primary"
                    className="btn btn-danger"
                    onClick={this.modalOn}
                  >
                    New Cohort
                  </Button>
                </div>
                <div>
                  <CohortTableComponent toggle={this.toggle} />
                </div>
              </div>

              <div className="col-9 pr-0">
                <CohortAssociatesComponent collapse={this.state.collapse} />
              </div>
            </div>
            <CreateNewModalComponent
              toggle={this.modalOn}
              modal={this.state.modal}
              modalOff={this.modalOff}
            />
          </div>
          <div className="tab-pane fade container-fluid " id="manage-users" role="tabpanel" aria-labelledby="nav-manage-users-tab">
              <ManagerUsersTableComponent/>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ContainerComponent);
