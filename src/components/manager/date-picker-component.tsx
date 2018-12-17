import * as React from 'react';
import * as moment from 'moment';
import * as Helmet from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';

interface IComponent {
    from: any,
    to: any,
}

export class DatePickRange extends React.Component <{},IComponent>{
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }
  public showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.state.to.getDayPicker().showMonth(from);
    }
  }
  public handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
  }
  public handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
  }
  public render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo">
        <DayPickerInput
          value={from}
          placeholder="From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            disabledDays: { after: to },
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.state.to.getInput().focus(),
            selectedDays: [from, { from, to }],
            toMonth: to,
          }}
          onDayChange={this.handleFromChange}
        />{' '}
        —{' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.setState({
                to: el
            }))}
            value={to}
            placeholder="To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              disabledDays: { before: from },
              fromMonth: from,  
              modifiers,
              month: from,
              numberOfMonths: 2,
              selectedDays: [from, { from, to }],
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <Helmet>
          <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
        </Helmet>
      </div>
    );
  }
}