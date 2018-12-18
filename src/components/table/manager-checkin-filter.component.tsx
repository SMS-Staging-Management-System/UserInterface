import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';
import { NumberOfBytesType } from 'aws-sdk/clients/kms';

interface IState {
  cohort: string,
  endDate: NumberOfBytesType,
  startDate: number,
  user: any
}
export class ManagerCheckinFilterComponent extends React.Component<{}, IState> {
  constructor(props) {
    super(props)
    this.state = {
      cohort: '',
      endDate: null,
      startDate: null,
      user: ''
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

  public render() {
    const day = MomentLocaleUtils;
    console.log(day)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    return (

      <>
        <div className="filter-wrapper">
          <div className="v-center">
            <div className="form-group sel-box" >
              <select className="form-control sel-elem" >
                <option>All</option>
                <option>Cohort 2</option>
                <option>Cohort 3</option>
                <option>Cohort 4</option>
              </select>
            </div>
            <div className="form-group sel-box">
              <h1 className="head-divider">|</h1>
            </div>
            <div className="form-group sel-box" >
              <select className="form-control sel-elem" >
                <option>All</option>
                <option>Associate 1</option>
                <option>Associate 2</option>
                <option>Associate 3</option>
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