import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';
import { NumberOfBytesType } from 'aws-sdk/clients/kms';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import * as managerActions from '../../actions/manager/manager.actions';
import { ICohort } from 'src/model/Cohort.model';

interface IComponentState {
  cohortId: number,
  endDate: NumberOfBytesType,
  startDate: number
}

interface IComponentProps {
  cohorts: ICohort[]
  getManagerCheckIn: (fromDate: number, toDate: number) => void
  getCheckInByCohortId: (cohortId: number, fromDate: number, toDate: number) => void
}

export class ManagerCheckinFilterComponent extends React.Component<IComponentProps, IComponentState> {
  constructor(props) {
    super(props)
    this.state = {
      cohortId: 0,
      endDate: new Date().setHours(0, 0, 0, 0) - 86379000,
      startDate: new Date().setHours(0, 0, 0, 0)
    }
  }

  public getStartDate = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    this.setState({
      startDate: new Date(input.value).getTime()
    })

  }

  public getEndDate = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    this.setState({
      endDate: new Date(input.value).getTime()
    })
  }

  public getTodayFilter = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);
    let endDateMilli = endDate.getTime()
    endDateMilli = endDateMilli + 86379000;

    this.setState({
      endDate: endDateMilli,
      startDate: currentDate.getTime(),
    })

    //  console.log("start day: "+ currentDate.toString() + "  end of day: " + endDateMilli.toString())

  }
  public getWeekFilter = () => {
    console.log("here")
    let lastWeek = new Date();
    lastWeek = new Date(lastWeek.setDate(lastWeek.getDate() - 7))
    const currentDate = new Date();
    console.log("today: " + currentDate.toString() + "  1 week ago: " + lastWeek.toString())
  }

  public getCustomDateFilter = () => {
    console.log()
  }

  public renderCohortOptionList = () => {
    if (this.props.cohorts.length === 0) {
      return <></>
    } else {
      return this.props.cohorts.map(cohort => {
        return <option
                  key={cohort.cohortId} 
                  value={cohort.cohortId}>
                  {cohort.cohortName}
                </option>
      })
    }
  }

  public submitGetCheckIn = () => {
    if(this.state.cohortId === 0) {
      this.props.getManagerCheckIn(this.state.startDate, this.state.endDate);
    } else {
      this.props.getCheckInByCohortId(this.state.cohortId, this.state.startDate, this.state.endDate);
    }
  }

  public changeCohortSelect = (e: any) => {
    this.setState({
      cohortId: e.target.value
    })
  }

  public render() {
    const day = MomentLocaleUtils;
    console.log(day);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();

    const cohortList = this.renderCohortOptionList();
    return (
      <>
        <div className="filter-wrapper">
          <div className="v-center">
            <div className="form-group sel-box" >
              <select onChange={this.changeCohortSelect} className="form-control sel-elem" >
                <option value={0}>All</option>
                {cohortList}
              </select>
            </div>
            <div className="form-group sel-box">
              <h1 className="head-divider">|</h1>
            </div>
            <div className="form-group sel-box">
              <h4 className="head-divider"> <button onClick={this.getTodayFilter} type="button" className="filter-button">Today</button> </h4>
            </div>
            <div className="form-group sel-box">
              <h1 className="head-divider">|</h1>
            </div>
            <div className="form-group sel-box">
              <h4 className="head-divider"><button onClick={this.getWeekFilter} type="button" className="filter-button">Week</button></h4>
            </div>
            <div className="form-group sel-box">
              <h1 className="head-divider">|</h1>
            </div>
            <div className="form-group sel-box">
              <DayPickerInput
                onDayChange={this.getStartDate}
                formatDate={formatDate}
                format="LL"
                parseDate={parseDate}
                placeholder={today.toLocaleDateString("en-US", options)}
              />
            </div>
            <div className="form-group sel-box">
              <h6 className="head-divider">To</h6>
            </div>
            <div className="form-group sel-box">
              <DayPickerInput
                onDayChange={this.getEndDate}
                formatDate={formatDate}
                format="LL"
                parseDate={parseDate}
                placeholder={today.toLocaleDateString("en-US", options)}
              />
            </div>
            <div className="form-group sel-box">
              <h4 className="head-divider"><button onClick={this.getCustomDateFilter} type="button" className="filter-button">Go</button></h4>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.manager)
const mapDispatchToProps = {
  ...managerActions
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagerCheckinFilterComponent);