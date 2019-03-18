import React from 'react';
import {AssociateChartComponent} from './AssociateChartComponent'
import {ManagerChartComponent} from './ManagerChartComponent'


//requires the importing of Line and Item classes, which should also be in Store

 /*
 let receiptTest : Receipt[]
 let receiptLines : Line[]
 */



export class ChartComponent extends React.Component<any, any> { //the first argument should be IReportFormProps
  constructor(props) {
    super(props);
  }


render() {
    return (
    <div>
      <div id='AssociateChart'>
          <AssociateChartComponent chart = {this.props.chart1} chartAction = {this.props.chartAction1} setCanvas = {this.props.canvas1}/>
          <br/>
          <h2>
        Data according to the Associates.
        <hr/>
    </h2>
      </div>
      <div id='ManagerChart'>
          <ManagerChartComponent chart = {this.props.chart2} chartAction = {this.props.chartAction2} setCanvas = {this.props.canvas2} />
          <br/>
          <h2>
        Data according to the Staging Manager.
        <hr/>
        </h2>
      </div>
    </div>
    )
  }
 
}
