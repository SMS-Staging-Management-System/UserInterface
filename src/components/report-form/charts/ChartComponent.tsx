import React from 'react';
import {AssociateChartComponent} from './AssociateChartComponent'
import {ManagerChartComponent} from './ManagerChartComponent'

export class ChartComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <div className='AssociateChart'>
      <h4 className="chart-title">Associates Graph<hr/></h4>
        <AssociateChartComponent chart = {this.props.chart1} chartAction = {this.props.chartAction1} setCanvas = {this.props.canvas1}/><br/>
       
      </div>
      <div className='ManagerChart'>
      <h4 className="chart-title">Staging Manager Graph<hr/></h4>
        <ManagerChartComponent chart = {this.props.chart2} chartAction = {this.props.chartAction2} setCanvas = {this.props.canvas2} /><br/>

      </div>
    </div>
    )
  }
}