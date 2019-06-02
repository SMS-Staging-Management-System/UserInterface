import React from 'react';

import {JDChartComponent} from './JDChartComponent'

export class ChartComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
	
  }
  

  render() {
    return(
   
      
        <div className='JDChartComponent'>
          <h4 className="chart-title"><b>Job Description Information</b></h4>
          <JDChartComponent chart = {this.props.chart1} chartAction = {this.props.chartAction1} setCanvas = {this.props.canvas1}/><br/>
        </div>
     

    )
  }
}